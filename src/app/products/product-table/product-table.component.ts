import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../../shared/product";
import {ProductsService} from '../products.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges, AfterViewInit {
  @Input() products: Product[] = [];
  @Input() columnsToDisplay: string[] = ["name", "available", "price", "discount"]
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(private productService: ProductsService) {
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSet.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSet.data = this.products
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
