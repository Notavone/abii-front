import {Component, OnInit} from '@angular/core';
import {Order} from "./dto/order";
import {OrdersService} from './orders.service';
import {Client} from "../clients/dto/client";
import {Product} from "../products/dto/product";
import {ClientsService} from "../clients/clients.service";
import {ProductsService} from "../products/products.service";
import {OrderQueryDto} from "./dto/order-query.dto";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = []
  total = 0;

  start?: Date;
  end?: Date;
  selectedClient?: Client;
  selectedProduct?: Product;
  allowRefunded: boolean = false;
  allowIncomplete: boolean = false;
  isLoading: boolean = true;

  constructor(private orderService: OrdersService, private clientService: ClientsService, private productService: ProductsService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.orderService.getOrders(),
      this.clientService.getClients(),
    ])
      .subscribe(([orders, clients]) => {
        this.orders = orders;
        this.clients = clients;
        this.isLoading = false;
      });
  }

  update() {
    const query = new OrderQueryDto();
    let startTime = this.start?.getTime();
    let endTime = this.end?.getTime();

    if (startTime) query.fromTimestamp = startTime;
    if (endTime) query.toTimestamp = endTime;
    if (this.selectedClient) query.clientId = this.selectedClient.id;
    if (this.selectedProduct) query.productId = this.selectedProduct.id;
    if (this.allowRefunded) query.allowRefunded = this.allowRefunded;
    if (this.allowIncomplete) query.allowIncomplete = this.allowIncomplete;

    this.orderService.getOrders(query)
      .subscribe(orders => {
        this.orders = orders;
        this.total = orders.reduce((acc, cur) => acc + +cur.total, 0);
      });
  }
}
