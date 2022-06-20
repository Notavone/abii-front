import { Component, OnInit } from "@angular/core";
import { EanService } from "./ean.service";
import { ProductsService } from "../products/products.service";
import { forkJoin } from "rxjs";
import { Product } from "../products/dto/product";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Ean, MappedEan } from "./dto/ean.entity";
import { MatDialog } from "@angular/material/dialog";
import { EanEditModalComponent, EanEditModalData, EanEditModalMode } from "./ean-edit-modal/ean-edit-modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmService } from "../../features/confirm/confirm.service";
import { ProductQueryDto } from "../products/dto/product-query.dto";
import { EanUpdateDto } from "./dto/ean-update.dto";
import { EanCreateDto } from "./dto/ean-create.dto";

@Component({
  selector: "app-ean",
  templateUrl: "./ean.component.html",
  styleUrls: ["./ean.component.scss"],
})
export class EanComponent implements OnInit {
  public isLoading: boolean = true;
  public eans: MappedEan[] = [];
  public products: Product[] = [];

  constructor(
    private eanService: EanService,
    private productsService: ProductsService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    const productQueryDto = new ProductQueryDto();
    productQueryDto.useStock = true;

    forkJoin([this.eanService.getEans(), this.productsService.getProducts(productQueryDto)])
      .subscribe(([eans, products]) => {
        this.isLoading = false;
        this.eans = eans.map(e => new MappedEan(e, new EanUpdateDto(e)));
        this.products = products;
      });
  }

  eanForProduct(product: Product) {
    return this.eans.filter((e) => e.ean.productId === product.id);
  }

  unassignedEans() {
    return this.eans.filter(e => !e.ean.productId);
  }

  handleDrop(dragDrop: CdkDragDrop<Product | null, MappedEan, MappedEan>) {
    const mappedEan = dragDrop.item.data;
    mappedEan.dto.productId = dragDrop.container.data?.id || null;
    this.update(mappedEan.ean.id, mappedEan);
  }

  handleSettingsOpen(ean: MappedEan) {
    this.matDialog.open<EanEditModalComponent, EanEditModalData, MappedEan>(EanEditModalComponent, {
      data: new EanEditModalData(ean, EanEditModalMode.UPDATE),
    }).beforeClosed()
      .subscribe((res) => {
        if (res === null) this.delete(ean);
        else this.update(ean.ean.id, res);
      });
  }

  openReadonly(ean: MappedEan) {
    this.matDialog.open<EanEditModalComponent, EanEditModalData, MappedEan>(EanEditModalComponent, {
      data: new EanEditModalData(ean, EanEditModalMode.READONLY),
    });
  }

  handleCreation(value?: string) {
    let eanCreateDto = new EanCreateDto();
    if (value) eanCreateDto.value = value;
    let eanEditModalData = new EanEditModalData(new MappedEan(new Ean(), eanCreateDto), EanEditModalMode.CREATE);

    eanEditModalData.mappedEan.dto.value = value;
    this.matDialog.open<EanEditModalComponent, EanEditModalData, MappedEan>(EanEditModalComponent, {
      data: eanEditModalData,
    }).beforeClosed()
      .subscribe((res) => {
        if (res && res.dto instanceof EanCreateDto) {
          this.isLoading = true;
          this.eanService.createEan(res.dto)
            .subscribe({
              next: (ean) => {
                this.eans.push(new MappedEan(ean, new EanUpdateDto(ean)));
                this.matSnackBar.open("EAN créé avec succès !");
                this.isLoading = false;
              },
              error: () => {
                this.matSnackBar.open("Impossible de créer cet EAN.");
                this.isLoading = false;
              },
            });
        }
      });
  }

  private update(id: number, mappedEan?: MappedEan) {
    if (!mappedEan) return;
    this.confirmService.open({
      title: "Mettre à jour un EAN",
      message: "Voulez-vous mettre à jour cet EAN ?",
      onConfirm: () => {
        this.isLoading = true;
        this.eanService.updateEan(id, mappedEan.dto)
          .subscribe({
            next: (ean) => {
              this.eans.splice(this.eans.findIndex((e) => e.ean.id === ean.id), 1, { ...mappedEan, ean });
              this.matSnackBar.open("EAN mis à jour avec succès !");
              this.isLoading = false;
            },
            error: () => {
              this.matSnackBar.open("Impossible de mettre à jour cet EAN.");
              this.isLoading = false;
            },
          });
      },
    });
  }

  private delete(mappedEan: MappedEan) {
    this.confirmService.open({
      title: "Supprimer un EAN",
      message: "Voulez-vous supprimer cet EAN ?",
      onConfirm: () => {
        this.isLoading = true;
        this.eanService.deleteEan(mappedEan.ean.id)
          .subscribe({
            next: () => {
              this.eans.splice(this.eans.findIndex((e) => e.ean.id === mappedEan.ean.id), 1);
              this.matSnackBar.open("EAN supprimé avec succès !");
              this.isLoading = false;
            },
            error: () => {
              this.matSnackBar.open("Impossible de supprimer cet EAN.");
              this.isLoading = false;
            },
          });
      },
    });
  }
}
