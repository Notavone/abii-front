import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "./dto/order";
import {QueryService} from "../../features/query.service";
import {OrderCreateDto} from "./dto/order-create.dto";
import {OrderQueryDto} from "./dto/order-query.dto";
import {OrderUpdateDto} from "./dto/order-update.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = "/api/orders";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
  ) {
  }

  getOrders(query?: OrderQueryDto): Observable<Order[]> {
    let url = `${this.baseUrl}`;
    if (query) url += this.queryService.encode(query);

    return this.http.get<Order[]>(url);
  }

  getOrder(id: number): Observable<Order> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  addOrder(order: OrderCreateDto): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  updateOrder(order: OrderUpdateDto): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${order.id}`, {orderLines: order.orderLines});
  }

  confirmOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${order.id}/confirm`, {});
  }

  refundOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${order.id}/refund`, {});
  }
}
