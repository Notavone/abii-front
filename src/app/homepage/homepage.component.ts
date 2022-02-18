import {Component, OnInit} from '@angular/core';
import {ProductService} from '../products/shared/product.service';
import {Product} from "../products/shared/product";
import {ProductType} from "../products/shared/product-type";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products.filter(p => p.type === ProductType.PRODUCT_FOOD && p.available));
  }

}
