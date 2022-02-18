import {Component, Input, OnInit} from '@angular/core';
import {OrderEvent} from "../../../orders/shared/order-event";
import {Order} from "../../../orders/shared/order";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../shared/product";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../../orders/shared/order.service";

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {
  @Input() product?: Product;
  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService) {
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
