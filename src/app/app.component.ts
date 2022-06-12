import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Authority} from "./auth/authority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn && !this.authService.getCurrentUser()) {
      this.authService.fetchCurrentUser().subscribe((user) => this.snackBar.open(`Connecté en tant que ${user.name}`));
    }
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
