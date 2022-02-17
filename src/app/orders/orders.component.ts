import {Component, OnInit} from '@angular/core';
import {Order} from "./shared/order";
import {OrderService} from './shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

}
