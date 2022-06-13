import { Component, OnInit } from "@angular/core";
import { AuthService } from "./business/auth/auth.service";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Authority } from "./business/auth/authority";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  transitioning: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(["/login"]));
  }

  ngOnInit(): void {
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
}
