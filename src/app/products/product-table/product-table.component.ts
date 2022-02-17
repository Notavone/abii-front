import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../shared/product";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Input() products: Product[] = [];
  columnsToDisplay: string[] = ["name", "price", "discount"];

  constructor() {
  }

  ngOnInit() {
  }
}
