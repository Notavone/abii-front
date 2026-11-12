import { Component, OnInit } from "@angular/core";
import { AuthService } from "./business/auth/auth.service";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Authority } from "./business/auth/authority";
import { NotificationsService } from "./features/notifications/notifications.service";
import { BottomBarService } from "./features/bottom-bar.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: false
})
export class AppComponent implements OnInit {
  transitioning: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private notificationService: NotificationsService,
    readonly bottomBar: BottomBarService,
  ) {
  }

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(["/login"]));
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      void this.notificationService.sync();
    }

    if (this.authService.isLoggedIn && !this.authService.getCurrentUser()) {
      this.authService.fetchCurrentUser().subscribe((user) => this.snackBar.open(`Connecté en tant que ${user.name}`));
    }

    this.router.events
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          this.transitioning = true;
        }

        if (e instanceof NavigationEnd
          || e instanceof NavigationError
          || e instanceof NavigationCancel) {
          this.transitioning = false;
        }
      });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get userId() {
    return this.authService.getCurrentUser()?.id;
  }

  hasManageRights() {
    let currentUser = this.authService.getCurrentUser();
    return currentUser?.authorities?.includes(Authority.ADMIN) || currentUser?.authorities?.includes(Authority.USER_SELLER);
  }

  isAdmin() {
    let currentUser = this.authService.getCurrentUser();
    return currentUser?.authorities?.includes(Authority.ADMIN);
  }
}
