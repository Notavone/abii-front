import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductCategory } from "../../../products/dto/product-category";

@Component({
  selector: 'app-order-cashier-category-card',
  templateUrl: './order-cashier-category-card.component.html',
  styleUrls: ['./order-cashier-category-card.component.scss'],
})
export class OrderCashierCategoryCardComponent implements OnInit {

  @Input() category?: ProductCategory;
  @Input() disabled: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
