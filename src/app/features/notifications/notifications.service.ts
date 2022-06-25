import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { HttpClient } from "@angular/common/http";
import { QueryService } from "../query.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  baseUrl = "/api/notifications";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private fireMessaging: AngularFireMessaging,
    private matSnackBar: MatSnackBar,
  ) {
  }

  subscribe(token: string) {
    const params = this.queryService.encode({ token });
    this.http.get(this.baseUrl + "/subscribe", { params }).subscribe();
  }

  requestPermission() {
    this.fireMessaging.requestToken
      .subscribe({
        next: (token) => {
          if (token) {
            console.log(token);
            this.subscribe(token);
          }
        },
      });

    this.fireMessaging.messages
      .subscribe({
        next: (message) => {
          this.matSnackBar.open(message.notification?.title ?? "", "OK", {
            duration: 3000,
          });
        },
      });
  }

  testPush() {
    this.http.get(this.baseUrl + "/test").subscribe();
  }
}
