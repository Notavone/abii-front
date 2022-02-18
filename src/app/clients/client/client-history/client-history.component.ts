import {Component, Input, OnInit} from '@angular/core';
import {OrderEvent} from "../../../orders/shared/order-event";
import {Client} from "../../shared/client";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from '../../shared/client.service';
import {Order} from "../../../orders/shared/order";
import {OrderService} from "../../../orders/shared/order.service";

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss']
})
export class ClientHistoryComponent implements OnInit {
  @Input() client?: Client;
  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private clientService: ClientService, private orderService: OrderService) {
  }

  ngOnInit() {
    let id = "" + this.route.parent?.snapshot.paramMap.get("id");

    this.clientService.getClient(id)
      .subscribe(client => {
        this.client = client;

        this.orderService.getOrders({client: client._id})
          .subscribe(orders => this.orders = orders);
      });
  }

  orderDeleted(event: OrderEvent) {
    this.orders = this.orders.filter(o => o._id !== event.order._id);
  }
}
