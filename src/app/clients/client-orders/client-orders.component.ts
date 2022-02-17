import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from "../shared/client";
import {OrderService} from "../../orders/shared/order.service";
import {Order} from "../../orders/shared/order";

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit, OnChanges {
  @Input() client?: Client;
  public orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.client) throw "Should not happen.";
    this.orderService.getOrders({client: this.client._id})
      .subscribe(orders => this.orders = orders);
  }
}
