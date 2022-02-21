import {Component, OnInit} from '@angular/core';
import {Order} from "../orders/shared/order";
import {OrderService} from "../orders/shared/order.service";
import {ClientService} from "../clients/shared/client.service";
import { ProductService } from '../products/shared/product.service';
import {Client} from "../clients/shared/client";
import {Product} from "../products/shared/product";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = []
  total = 0;

  start?: Date;
  end?: Date;
  selectedClient?: Client;
  selectedProduct?: Product;

  constructor(private orderService: OrderService, private clientService: ClientService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);

    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  handleChange() {
    let startTime = this.start?.getTime();
    let endTime = this.end?.getTime();

    if (!startTime || !endTime) return;
    this.orderService.getOrders({date: {$gt: startTime, $lt: endTime}, client: this.selectedClient?._id ?? "", 'lines.product': this.selectedProduct?._id ?? ""})
      .subscribe(orders => {
        this.orders = orders;
        this.total = orders.reduce((acc, cur) => acc + cur.total * -1, 0);
      });
  }
}
