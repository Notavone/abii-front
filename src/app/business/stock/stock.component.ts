import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products/products.service";
import { Location } from "@angular/common";
import { StockLine } from "./stock-line";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmService } from "../../features/confirm/confirm.service";
import { tap } from "rxjs";
import { EanService } from "../ean/ean.service";
import { MatDialog } from "@angular/material/dialog";
import { StockModalComponent } from "./stock-modal/stock-modal.component";
import { Product } from "../products/dto/product";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  isLoading: boolean = true;
  lines: StockLine[] = [];

  constructor(
    private productsService: ProductsService,
    private location: Location,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private eanService: EanService,
    private dialogService: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts({ useStock: true })
      .subscribe({
        next: (products) => {
          this.lines = products.map((product) => ({ product }));
          this.isLoading = false;
        },
      });
  }

  goBack() {
    this.location.back();
  }

  update() {
    this.confirmService.open({
      title: "Mise à jour du stock",
      message: "Voulez-vous mettre à jour les stocks ?",
      onConfirm: () => {
        this.isLoading = true;
        const lines = this.lines.filter((line) => line.alert !== undefined || line.stock !== undefined);
        this.productsService.updateBulk({
          products: lines.map((l) => ({ id: l.product.id, alert: l.alert, stock: l.stock })),
          useTransaction: true,
        })
          .pipe(tap(() => this.isLoading = false))
          .subscribe({
            next: (products) => {
              this.snackBar.open("Stock mis à jour");
              this.lines.forEach((line) => {
                let product = products.find((p) => p.id === line.product.id);
                if (product) line.product = product;
                line.alert = undefined;
                line.stock = undefined;
              });
            },
          });
      },
    });
  }

  isLineOutOfStock(line: StockLine) {
    if (!line.product.available) return false;
    return line.product.stock <= 0;
  }

  isLineAlert(line: StockLine) {
    if (!line.product.available) return false;
    return line.product.stock <= line.product.alert;
  }

  isLineUnavailable(line: StockLine) {
    return !line.product.available;
  }

  sortLines(lines: StockLine[]) {
    return lines.sort((a, b) => {
      const aProduct = a.product;
      const bProduct = b.product;

      if (aProduct.available && !bProduct.available) return -1;
      if (!aProduct.available && bProduct.available) return 1;

      if (this.isLineOutOfStock(a) && !this.isLineOutOfStock(b)) return -1;
      if (!this.isLineOutOfStock(a) && this.isLineOutOfStock(b)) return 1;

      if (this.isLineAlert(a) && !this.isLineAlert(b)) return -1;
      if (!this.isLineAlert(a) && this.isLineAlert(b)) return 1;

      return aProduct.stock < bProduct.stock ? -1 : 1;
    });
  }

  triggerStockChangeForEan(value: string) {
    this.eanService.getEanByValue(value)
      .subscribe({
        next: (ean) => {
          this.confirmService.open({
            title: "Mise à jour du stock",
            message: "Voulez-vous mettre à jour le stock du produit scanné ?",
            onConfirm: () => {
              if (ean?.product) {
                this.isLoading = true;
                this.productsService.updateProduct(ean.product.id, { stock: ean.product.stock + ean.quantity })
                  .subscribe({
                    next: (product) => {
                      const lineIdx = this.lines.findIndex((l) => l.product.id === product.id);
                      this.lines[lineIdx].product = product;
                      this.isLoading = false;
                      this.snackBar.open("Stock mis à jour avec succès !");
                    },
                    error: () => {
                      this.snackBar.open("Impossible de mettre à jour le stock du produit.");
                      this.isLoading = false;
                    },
                  });
              } else {
                this.snackBar.open("Ce code produit existe mais n'est pas lié à un produit.");
              }
            },
          });
        },
        error: () => {
          this.snackBar.open("Ce produit n'est pas dans la base de donnée.");
        },
      });
  }

  openHistory(product: Product) {
    this.dialogService.open(StockModalComponent, {
      data: product,
      panelClass: ["w-3/4"]
    });
  }
}
