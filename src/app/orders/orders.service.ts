import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Order} from "./dto/order";
import {QueryService} from "../features/query.service";
import {AuthService} from "../auth/auth.service";
import {LoggingService} from "../features/logging.service";
import {ClientsService} from "../clients/clients.service";
import {OrderCreateDto} from "./dto/order-create.dto";
import {OrderQueryDto} from "./dto/order-query.dto";
import {OrderUpdateDto} from "./dto/order-update.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = "/api/orders";
  private provider = "OrdersService";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private authService: AuthService,
    private loggingService: LoggingService,
    private clientService: ClientsService
  ) {
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getOrders(query?: OrderQueryDto): Observable<Order[]> {
    let url = `${this.baseUrl}`;
    if (query) url += this.queryService.encode(query);

    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<Order[]>([]))
      );
  }

  getOrder(id: number): Observable<Order> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  addOrder(order: OrderCreateDto): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  updateOrder(order: OrderUpdateDto): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${order.id}`, {orderLines: order.orderLines})
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  confirmOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${order.id}/confirm`, {})
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  refundOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${order.id}/refund`, {})
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  deleteOrder(id: number): Observable<Order> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Order>(url)
      .pipe(
        catchError(this.handleError<any>())
      );
  }
}
