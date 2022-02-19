import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Product} from "../shared/product";
import {ProductService} from '../shared/product.service';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Input() columnsToDisplay: string[] = ["name", "available", "price", "discount"]
  dataSet: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSet.data = this.products.sort((a, b) => a.name.localeCompare(b.name));
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
