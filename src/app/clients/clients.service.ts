import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./dto/client";
import {AuthService} from "../auth/auth.service";
import {LoggingService} from "../features/logging.service";
import {ClientUpdateDto} from "./dto/client-update.dto";
import {ClientCreateDto} from "./dto/client-create.dto";
import {ProductUpdateDto} from "../products/dto/product-update.dto";
import {ClientQueryDto} from "./dto/client-query.dto";
import {QueryService} from "../features/query.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = "/api/clients";

  constructor(private http: HttpClient,
              private authService: AuthService,
              private loggingService: LoggingService,
              private queryService: QueryService,
  ) {
  }

  getClients(query?: ClientQueryDto): Observable<Client[]> {
    let url = this.baseUrl;
    if (query) url += this.queryService.encode(query);
    return this.http.get<Client[]>(url);
  }

  getClient(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  updateClient(id: number, client: ClientUpdateDto): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.patch<Client>(url, client);
  }

  addClient(client: ClientCreateDto): Observable<Client> {
    let url = `${this.baseUrl}/`;
    return this.http.post<Client>(url, client);
  }

  deleteClient(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Client>(url);
  }

  updateStatus(id: number, newDate: Date): Observable<Client> {
    let url = `${this.baseUrl}/${id}/`
    const dto: ProductUpdateDto = {
      subscribedUntil: newDate
    }
    return this.http.patch<Client>(url, dto);
  }

  updateBalance(id: number, newBalance: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}/`;
    const dto: ClientUpdateDto = {
      balance: newBalance
    }
    return this.http.patch<Client>(url, dto);
  }
}
