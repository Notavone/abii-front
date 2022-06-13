import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products/products.service";
import {Location} from "@angular/common";
import {StockLine} from "./stock-line";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ConfirmService } from "../../features/confirm/confirm.service";
import { tap } from "rxjs";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  isLoading: boolean = true;
  lines: StockLine[] = [];

  constructor(
    private productsService: ProductsService,
    private location: Location,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts({useStock: true})
      .subscribe({
        next: (products) => {
          this.lines = products.map((product) => ({product}));
          this.isLoading = false;
        }
      })
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
          products: lines.map((l) => ({id: l.product.id, alert: l.alert, stock: l.stock})),
          useTransaction: true
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
            }
          })
      }
    })
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
    })
  }
}
