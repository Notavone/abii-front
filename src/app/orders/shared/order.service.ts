import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Order} from "./order";
import {Response} from "../../shared/response";
import {MessageService} from "../../shared/message.service";
import {QueryService} from "../../shared/query.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = "http://localhost:3000/api/orders";

  constructor(private http: HttpClient, private messageService: MessageService, private queryService: QueryService) {
  }

  private log(message: string) {
    this.messageService.add(`OrderService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getOrders(query?: Object): Observable<Order[]> {
    let url = `${this.baseUrl}${this.queryService.encode(query ?? {})}`;
    return this.http.get<Response<Order[]>>(url)
      .pipe(
        map(r => r.data),
        tap(_ => this.log("fetched orders")),
        catchError(this.handleError<Order[]>("getAll", []))
      );
  }
}
