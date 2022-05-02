import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Client} from "./dto/client";
import {AuthService} from "../auth/auth.service";
import {LoggingService} from "../features/logging.service";
import {ClientUpdateDto} from "./dto/client-update.dto";
import {ClientCreateDto} from "./dto/client-create.dto";
import {ProductUpdateDto} from "../products/dto/product-update.dto";
import {ClientQueryDto} from "./dto/client-query.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = "/api/clients";
  private provider = "ClientsService";

  constructor(private http: HttpClient, private authService: AuthService, private loggingService: LoggingService) {
    this.loggingService.log(this.provider, `init cache`);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getClients(query?: ClientQueryDto): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Client[]>([]))
      )
  }

  getClient(id: number): Observable<Client> {

    let defaultResult: Client = {
      id: id,
      name: "(??) Client inconnu",
      balance: 0,
      subscribedUntil: new Date(),
    };

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url)
      .pipe(
        catchError(this.handleError<Client>(defaultResult))
      );
  }

  updateClient(id: number, client: ClientUpdateDto): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.patch<Client>(url, client)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  addClient(client: ClientCreateDto): Observable<Client> {
    let url = `${this.baseUrl}/`;
    return this.http.post<Client>(url, client)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  deleteClient(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Client>(url)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  updateStatus(id: number, newDate: Date): Observable<Client> {
    let url = `${this.baseUrl}/${id}/`
    const dto: ProductUpdateDto = {
      subscribedUntil: newDate
    }
    return this.http.patch<Client>(url, dto)
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  updateBalance(id: number, newBalance: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}/`;
    const dto: ClientUpdateDto = {
      balance: newBalance
    }
    return this.http.patch<Client>(url, dto)
      .pipe(
        catchError(this.handleError<any>())
      );
  }
}
