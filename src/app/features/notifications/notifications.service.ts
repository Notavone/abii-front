import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { QueryService } from "../query.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwPush } from "@angular/service-worker";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  baseUrl = "/api/notifications";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private matSnackBar: MatSnackBar,
    private swPush: SwPush,
  ) {
  }

  subscribe() {
    this.swPush.subscription.subscribe((sub) => {
      if (sub) {
        this.http.post(this.baseUrl + "/subscribe", sub)
          .subscribe();
      } else {
        this.swPush.requestSubscription({
          serverPublicKey: environment.vapidkey,
        }).then((sub) => {
          this.http.post(this.baseUrl + "/subscribe", sub)
            .subscribe();
        });
      }
    });
  }

  testPush() {
    this.http.get(this.baseUrl + "/test").subscribe();
  }
}
