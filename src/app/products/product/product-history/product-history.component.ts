import {Component, Input, OnInit} from '@angular/core';
import {OrderEvent} from "../../../orders/order-event";
import {Order} from "../../../shared/order";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/product";
import {ProductsService} from "../../products.service";
import {OrdersService} from "../../../orders/orders.service";

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {
  @Input() product?: Product;
  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService, private orderService: OrdersService) {
  }

  ngOnInit(): void {
    let id = "" + this.route.parent?.snapshot.paramMap.get("id");

    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.orderService.getOrders({'lines.product': product._id})
          .subscribe(orders => this.orders = orders);
      })
  }

  orderDeleted(event: OrderEvent) {
      this.orders = this.orders.filter(o => o._id !== event.order._id);
  }
}
