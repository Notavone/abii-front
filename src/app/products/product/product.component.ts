import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../dto/product";
import {OrdersService} from "../../orders/orders.service";
import {Order} from "../../orders/dto/order";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductCreateDto} from "../dto/product-create.dto";
import {ProductType} from "../../shared/product-type";
import {ConfirmService} from "../../features/confirm/confirm.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: Product;
  orders?: Order[];
  productDto!: ProductCreateDto;
  productType = ProductType;
  productDtoOriginal!: ProductCreateDto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private ordersService: OrdersService,
    private location: Location,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      return;
    }

    this.productService.getProduct(+id)
      .subscribe(product => {
        this.product = product;

        this.productDto = {
          name: product.name,
          type: product.type,
          price: product.price,
          price_red: product.price_red,
          available: product.available,
        }
        this.productDtoOriginal = {...this.productDto};

        this.ordersService.getOrders({productId: product.id, allowRefunded: true, allowIncomplete: true})
          .subscribe(orders => this.orders = orders);
      })
  }


  goBack() {
    return this.location.back();
  }

  update() {
    this.confirmService.open({
      title: "Mettre à jour le produit",
      message: "Êtes-vous sûr de vouloir mettre à jour le produit ?",
      onConfirm: () => {
        this.productService.updateProduct(this.product.id, this.productDto)
          .subscribe({
            next: () => {
              this.snackBar.open("Produit mis à jour");
              this.productDtoOriginal = {...this.productDto};
            },
            error: () => this.snackBar.open("Impossible de mettre à jour le produit")
          });
      }
    })
  }

  delete() {
    this.confirmService.open({
      title: "Supprimer un produit",
      message: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      onConfirm: () => this.productService.deleteProduct(this.product.id)
        .subscribe({
          next: () => {
            this.snackBar.open("Produit supprimé");
            this.goBack();
          },
          error: () => this.snackBar.open("Impossible de supprimer le produit")
        })
    })
  }

  get hasDtoChanged() {
    return JSON.stringify(this.productDto) !== JSON.stringify(this.productDtoOriginal);
  }
}
