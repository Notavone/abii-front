import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {Product} from "../shared/product";
import {ProductType} from "../shared/product-type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productTypes = ProductType;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  filterBy(type: ProductType) {
   return this.products.filter(p => p.type === type);
  }
}
