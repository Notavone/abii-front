import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from "../../shared/product";
import {ProductService} from '../../shared/product.service';
import {DialogConfirmComponent} from "../../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-product-params',
  templateUrl: './product-params.component.html',
  styleUrls: ['./product-params.component.scss']
})
export class ProductParamsComponent implements OnInit {
  @Input() product?: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    let id = "" + this.route.parent?.snapshot.paramMap.get("id");

    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }


  goBack(): void {
    this.router.navigate(["/products"]);
  }

  update() {
    if (!this.product) throw new Error("Should not happen.");
    this.productService.updateProduct(this.product)
      .subscribe(_ => this.goBack());
  }

  delete() {
    if (!this.product) throw new Error("Should not happen.");
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Supprimer un produit",
        text: `Êtes-vous sûr de vouloir supprimer le produit "${this.product.name}" ?`,
        confirm: "Supprimer"
      }
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
