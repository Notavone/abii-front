import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {Product} from "./dto/product";
import {ProductType} from "./product-type";
import {ProductCreateDto} from "./dto/product-create.dto";
import {Router} from "@angular/router";
import {ConfirmService} from "../../features/confirm/confirm.service";
import { tap } from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productTypes = ProductType;
  product: ProductCreateDto = new ProductCreateDto();
  isLoading: boolean = true;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.isLoading = false;
      });

    this.product = {
      ...this.product,
      type: ProductType.PRODUCT_FOOD,
      price: 0.7,
      price_red: 0.5
    }
  }

  filterBy(type: ProductType) {
    return this.products.filter(p => p.type === type);
  }

  updateProduct($event: Product) {
    let id = this.products.findIndex((p) => p.id === $event.id);
    this.products[id] = $event;
  }

  public save() {
    this.confirmService.open({
      title: "Créer un produit",
      message: "Voulez-vous créer ce produit ?",
      onConfirm: () => {
        this.isLoading = true;
        this.productService.addProduct(this.product)
          .pipe(tap(() => this.isLoading = false))
          .subscribe(product => this.router.navigate([`/products/${product.id}`]));
      }
    })
  }
}
