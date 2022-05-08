import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Authority} from "./shared/authority";
import {MediaMatcher} from "@angular/cdk/layout";

type NavLink = {
  href: string;
  conditions?: unknown[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mobileQuery?: MediaQueryList;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
  ) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', () => {
      this.changeDetectorRef.detectChanges();
    });
  }

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

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  hasManageRights() {
    let currentUser = this.authService.getCurrentUser();
    return currentUser?.authorities?.includes(Authority.ADMIN) || currentUser?.authorities?.includes(Authority.USER_SELLER);
  }
}
