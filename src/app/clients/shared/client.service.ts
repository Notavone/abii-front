import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Response} from "../../shared/response";
import {Client} from "./client";
import {Status} from "./status";
import {PaymentType} from "./payment-type";
import {AuthService} from "../../auth/shared/auth.service";
import {LoggingService} from "../../shared/logging.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = "http://localhost:3000/api/clients";
  private provider = "ClientService";
  private cache: Map<string, Client> = new Map();

  constructor(private http: HttpClient, private authService: AuthService, private loggingService: LoggingService) {
    this.loggingService.log(this.provider, `init cache`);
  }

  set(client: Client) {
    this.loggingService.log(this.provider, `set cache for id=${client._id}`);
    this.cache.set(client._id, client);
  }

  delete(client: Client) {
    this.loggingService.log(this.provider, `delete cache for id=${client._id}`);
    this.cache.set(client._id, client);
  }

  private handleError<T>(result?: T, errorClient?: Client) {
    return (error: any): Observable<T> => {
      if (errorClient) this.cache.set(errorClient._id, errorClient);
      console.error(error);
      return of(result as T);
    };
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Response<Client[]>>(this.baseUrl, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(clients => {
          for (let client of clients) {
            if(!this.cache.has(client._id)) this.set(client);
          }
        }),
        catchError(this.handleError<Client[]>([]))
      )
  }

  getClient(id: string): Observable<Client> {
    let existing = this.cache.get(id);
    if (existing) return of(existing);

    let defaultResult = {
      _id: id,
      name: "(??) Client inconnu",
      balance: 0,
      subscriptionEnd: 0
    };

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Client>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(client => this.set(client)),
        catchError(this.handleError<Client>(defaultResult, defaultResult))
      );
  }

  updateClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.patch<Response<Client>>(url, client, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(client => this.set(client)),
        catchError(this.handleError<any>())
      );
  }

  addClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.post<Response<Client>>(url, client, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(client => this.set(client)),
        catchError(this.handleError<any>())
      );
  }

  deleteClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.delete<Response<Client>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(() => this.delete(client)),
        catchError(this.handleError<any>())
      );
  }

  updateStatus(client: Client, status: Status): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/status`
    return this.http.patch<Response<Client>>(url, {status}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(client => this.set(client)),
        catchError(this.handleError<any>())
      );
  }

  updateBalance(client: Client, selectedPaymentType: PaymentType, amount: number): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/balance`;
    return this.http.patch<Response<Client>>(url, {type: selectedPaymentType, amount}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        tap(client => this.set(client)),
        catchError(this.handleError<any>())
      );
  }
}
