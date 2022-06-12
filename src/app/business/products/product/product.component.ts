import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../dto/product";
import {OrdersService} from "../../orders/orders.service";
import {Order} from "../../orders/dto/order";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductType} from "../product-type";
import {ConfirmService} from "../../../features/confirm/confirm.service";
import {ProductUpdateDto} from "../dto/product-update.dto";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: Product;
  orders?: Order[];
  productDto!: ProductUpdateDto;
  productType = ProductType;
  productDtoOriginal!: ProductUpdateDto;
  isLoading: boolean = true;

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
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) this.router.navigate(['/404']);
      const id = params.get('id')!;
      this.productService.getProduct(+id)
        .subscribe(product => {
          this.product = product;
          this.productDto = {
            name: product.name,
            type: product.type,
            price: product.price,
            price_red: product.price_red,
            available: product.available,
            stock: product.stock,
            useStock: product.useStock,
          }
          this.productDtoOriginal = {...this.productDto};

          this.ordersService.getOrders({productId: product.id, allowRefunded: true, allowIncomplete: true})
            .subscribe(orders => {
              this.orders = orders;
              this.isLoading = false;
            });
        })
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
            next: (product) => {
              this.product = product;
              this.productDtoOriginal = {...this.productDto};
              this.snackBar.open("Produit mis à jour");
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

  removeProductImage() {
    this.confirmService.open({
      title: "Supprimer l'image",
      message: "Êtes-vous sûr de vouloir supprimer cette image ?",
      onConfirm: () => {
        this.productService.updateProduct(this.product.id, {image: ""})
          .subscribe({
            next: (product) => {
              this.product = product;
              this.snackBar.open("Image supprimée");
            },
            error: () => this.snackBar.open("Impossible de supprimer l'image")
          });
      }
    });
  }
}
