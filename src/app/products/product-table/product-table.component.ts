import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../dto/product";
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
  @Input() columnsToDisplay: string[] = ["name", "available", "sellable", "price", "discount"]
  @Output() productUpdated = new EventEmitter<Product>();
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(private productService: ProductsService) {
  }

  ngAfterViewInit() {
    if (this.sort) this.dataSet.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSet.data = this.products
  }

  toggleAvailability(product: Product) {
    this.productService.toggleAvailability(product)
      .subscribe(newProduct => {
        this.productUpdated.emit(newProduct);
      })
  }
}
