import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {LoggingService} from '../../features/logging.service';
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs";
import {UsersService} from "../users/users.service";
import {User} from "../users/dto/user";
import { NotificationsService } from "../../features/notifications/notifications.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "/api/auth";
  private provider = "AuthService";
  private currentUser?: User;

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService,
    private cookieService: CookieService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {
    this.loggingService.log(this.provider, "init");
  }

  login(email: string, password: string) {
    return this.http.post<User>(this.baseUrl + "/login", {email, password})
      .pipe(
        tap(() => {
          this.usersService.getMe()
            .subscribe(user => {
              this.currentUser = user;
              this.notificationsService.subscribe()
            });
        }),
      );
  }

  logout() {
    return this.http.post(this.baseUrl + "/logout", {})
      .pipe(
        tap(() => delete this.currentUser),
      );
  }

  get isLoggedIn() {
    return this.cookieService.check("access_token");
  }

  getCurrentUser() {
    return this.currentUser;
  }

  fetchCurrentUser() {
    return this.usersService.getMe()
      .pipe(
        tap(user => this.currentUser = user)
      );
  }
}
