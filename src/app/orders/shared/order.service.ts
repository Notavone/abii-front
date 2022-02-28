import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Order} from "./order";
import {Response} from "../../shared/response";
import {QueryService} from "../../shared/query.service";
import {AuthService} from "../../auth/shared/auth.service";
import {Client} from "../../clients/shared/client";
import {OrderLine} from "./order-line";
import {OrderEvent} from "./order-event";
import {LoggingService} from "../../shared/logging.service";
import {ClientService} from "../../clients/shared/client.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.url + "/api//orders";
  private provider = "OrderService";
  private cache: Map<string, Order> = new Map();

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private authService: AuthService,
    private loggingService: LoggingService,
    private clientService: ClientService
  ) {
  }

  set(order: Order) {
    this.loggingService.log(this.provider, `set cache for id=${order._id}`);
    this.cache.set(order._id, order);
  }

  delete(order: Order) {
    this.loggingService.log(this.provider, `delete cache for id=${order._id}`);
    this.cache.set(order._id, order);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getOrders(query?: Object): Observable<Order[]> {
    let url = `${this.baseUrl}${this.queryService.encode(query ?? {})}`;
    return this.http.get<Response<Order[]>>(url)
      .pipe(
        map(r => r.data.map(o => this.cache.has(o._id) ? this.cache.get(o._id)! : o)),
        tap(orders => {
          for (let order of orders) {
            if(!this.cache.has(order._id)) this.set(order);
          }
        }),
        catchError(this.handleError<Order[]>([]))
      );
  }

  getOrder(id: string): Observable<Order> {
    let existing = this.cache.get(id);
    if (existing) return of(existing);

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Order[]>>(url)
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  addOrder(client: Client, lines: OrderLine[]): Observable<OrderEvent> {
    return this.http.post<Response<OrderEvent>>(this.baseUrl, {lines, client: client._id})
      .pipe(
        map(r => r.data),
        tap(response => {
          this.set(response.order);
          this.clientService.set(response.client);
        }),
        catchError(this.handleError<any>())
      );
  }

  deleteOrder(order: Order): Observable<OrderEvent> {
    let url = `${this.baseUrl}/${order._id}`;
    return this.http.delete<Response<OrderEvent>>(url)
      .pipe(
        map(r => r.data),
        tap(response => {
          this.delete(response.order);
          this.clientService.set(response.client);
        }),
        catchError(this.handleError<any>())
      );
  }
}
