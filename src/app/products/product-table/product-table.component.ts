import {Component, Input} from '@angular/core';
import {Product} from "../shared/product";
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() columnsToDisplay: string[] = ["name", "available", "price", "discount"]

  constructor(private productService: ProductService) {
  }

  toggleAvailability(product: Product) {
    product.available = !product.available;
    this.productService.toggleAvailability(product)
      .subscribe(newProduct => {
        let id = this.products.indexOf(product);
        this.products[id] = newProduct;
      })
  }
}
