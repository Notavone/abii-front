import {Component, Input} from '@angular/core';
import {Product} from "../shared/product";
import { ProductService } from '../shared/product.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() columnsToDisplay: string[] = ["name", "available", "price", "discount"]

  constructor(private productService: ProductService, private router: Router) { }

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
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
