import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../shared/product";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    let id = "" + this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  update() {
    if (!this.product) throw new Error("Should not happen.");
    this.productService.updateProduct(this.product)
      .subscribe(_ => this.goBack());
  }

  delete() {
    if (!this.product) throw new Error("Should not happen.");
    this.dialog.open(DialogConfirmComponent, {
      data: `Êtes-vous sûr de vouloir supprimer le produit "${this.product.name}" ?`
    }).afterClosed()
      .subscribe(response => {
        if (response as unknown as boolean) {
          if (!this.product) throw new Error("Should not happen.");
          this.productService.deleteProduct(this.product)
            .subscribe(_ => this.goBack());
        }
      });
  }
}
