import {Component, Input} from '@angular/core';
import {Order} from "../../orders/shared/order";

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent {
  @Input() orders: Order[] = [];
}
