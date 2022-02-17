import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../../shared/message.service";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Response} from "../../shared/response";
import {Client} from "./client";
import {Status} from "./status";
import {PaymentType} from "./payment-type";
import {OrderLine} from "../../orders/shared/order-line";
import {Order} from "../../orders/shared/order";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = "http://localhost:3000/api/clients";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  private log(message: string) {
    this.messageService.add(`ClientService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Response<Client[]>>(this.baseUrl)
      .pipe(
        map(r => r.data),
        tap(_ => this.log("fetched clients")),
        catchError(this.handleError<Client[]>("getAll", []))
      )
  }

  getClient(id: string): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Response<Client>>(url)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`fetched client id=${id}`)),
        catchError(this.handleError<Client>("get", {
          _id: id,
          name: "(??) Client inconnu",
          balance: 0,
          subscriptionEnd: 0
        }))
      );
  }

  updateClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.patch<Response<Client>>(url, client, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`updated client id=${client._id}`)),
        catchError(this.handleError<any>("update"))
      );
  }

  addClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.post<Response<Client>>(url, client, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`created new client`)),
        catchError(this.handleError<any>("create"))
      );
  }

  deleteClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}`;
    return this.http.delete<Response<Client>>(url, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`deleted client id=${client._id}`)),
        catchError(this.handleError<any>("delete"))
      );
  }

  updateStatus(client: Client, status: Status): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/status`
    return this.http.patch<Response<Client>>(url, {status}, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`updated client id=${client._id} status=${status}`)),
        catchError(this.handleError<any>("setStatus"))
      );
  }

  updateBalance(client: Client, selectedPaymentType: PaymentType, amount: number): Observable<Client> {
    let url = `${this.baseUrl}/${client._id}/balance`;
    return this.http.patch<Response<Client>>(url, {type: selectedPaymentType, amount}, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`updated client id=${client._id} balance with ${amount}`)),
        catchError(this.handleError<any>("setBalance"))
      );
  }

  sendOrder(client: Client, lines: OrderLine[]): Observable<{ client: Client, order: Order }> {
    let url = `${this.baseUrl}/${client._id}/orders`;
    return this.http.post<Response<{ client: Client, order: Order }>>(url, {lines}, this.httpOptions)
      .pipe(
        map(r => r.data),
        tap(_ => this.log(`ordered for client id=${client._id}`)),
        catchError(this.handleError<any>("makeTransaction"))
      );
  }
}
