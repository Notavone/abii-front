import {Component} from '@angular/core';
import {ProductsService} from '../products.service';
import {Product} from "../../shared/product";
import {ProductType} from "../../shared/product-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent {
  product: Product = {
    _id: "",
    name: "",
    type: ProductType.PRODUCT_FOOD,
    price: 1,
    price_red: 0.50,
    available: true
  }
  productType = ProductType

  constructor(private productService: ProductsService, private router: Router) {
  }

  public save() {
    this.productService.addProduct(this.product)
      .subscribe(product => this.router.navigate([`/products/${product._id}`]));
  }
}
