import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Authority} from "./authority";

@Injectable({
  providedIn: 'root'
})
export class AbiiGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return this.authService.fetchCurrentUser()
        .pipe(
          map(user => {
            return !!user.authorities?.includes(Authority.ADMIN) || !!user.authorities?.includes(Authority.USER_SELLER)
          })
        );
    }

    return !!currentUser.authorities?.includes(Authority.ADMIN) || !!currentUser.authorities?.includes(Authority.USER_SELLER);
  }
}
