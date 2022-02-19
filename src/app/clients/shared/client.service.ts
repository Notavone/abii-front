import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Response} from "../../shared/response";
import {Client} from "./client";
import {Status} from "./status";
import {PaymentType} from "./payment-type";
import {AuthService} from "../../auth/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = "http://localhost:3000/api/clients";
  private errored = new Set<string>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private handleError<T>(result?: T, id?: string) {
    return (error: any): Observable<T> => {
      if(id) this.errored.add(id);
      console.error(error);
      return of(result as T);
    };
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Response<Client[]>>(this.baseUrl, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<Client[]>([]))
      )
  }

  getClient(id: string): Observable<Client> {
    let defaultResult = {
      _id: id,
      name: "(??) Client inconnu",
      balance: 0,
      subscriptionEnd: 0
    };
    if(this.errored.has(id)) return of(defaultResult);

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Client>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<Client>(defaultResult, id))
      );
  }

  updateClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.patch<Response<Client>>(url, client, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  addClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.post<Response<Client>>(url, client, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  deleteClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.delete<Response<Client>>(url, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  updateStatus(client: Client, status: Status): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/status`
    return this.http.patch<Response<Client>>(url, {status}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }

  updateBalance(client: Client, selectedPaymentType: PaymentType, amount: number): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/balance`;
    return this.http.patch<Response<Client>>(url, {type: selectedPaymentType, amount}, this.authService.httpOptions())
      .pipe(
        map(r => r.data),
        catchError(this.handleError<any>())
      );
  }
}
