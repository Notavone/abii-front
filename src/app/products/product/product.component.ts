import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../shared/product";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {Order} from "../../orders/shared/order";
import {OrderService} from "../../orders/shared/order.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: Product;
  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private location: Location,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    let id = "" + this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(id)
      .subscribe(product => this.product = product);

    this.orderService.getOrders({'lines.product': id})
      .subscribe(orders => this.orders = orders);
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
