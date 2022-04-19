import {Component, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {OrdersService} from "../orders/orders.service";
import {ClientsService} from "../clients/clients.service";
import { ProductsService } from '../products/products.service';
import {Client} from "../shared/client";
import {Product} from "../shared/product";

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

  constructor(private orderService: OrdersService, private clientService: ClientsService, private productService: ProductsService) {
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
