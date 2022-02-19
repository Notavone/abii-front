import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import { LoggingService } from 'src/app/shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000/token";
  private provider = "AuthService";
  token: string = "";

  constructor(private http: HttpClient, private loggingService: LoggingService) {
    this.loggingService.log(this.provider, "init");
    this.token = sessionStorage.getItem("token") ?? "";
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  login(email: string, password: string) {
    this.http.post<{ token: string }>(this.baseUrl, {email, password})
      .pipe(
        map(r => r.token),
        catchError(this.handleError<string>(""))
      )
      .subscribe(token => {
        this.token = token;
        sessionStorage.setItem("token", token);
      });
  }

  logout() {
    this.token = "";
    sessionStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!this.token
  }

  httpOptions() {
    return {
      headers: new HttpHeaders({'Authorization': "Bearer " + this.token}),
    };
  }
}
