import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Order} from "./order";
import {Response} from "../../shared/response";
import {QueryService} from "../../shared/query.service";
import {AuthService} from "../../auth/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = "http://localhost:3000/api/orders";

  constructor(private http: HttpClient, private queryService: QueryService, private authService: AuthService) {
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getOrders(query?: Object): Observable<Order[]> {
    let url = `${this.baseUrl}${this.queryService.encode(query ?? {})}`;
    return this.http.get<Response<Order[]>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<Order[]>([]))
      );
  }
}
