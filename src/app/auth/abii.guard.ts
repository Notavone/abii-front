import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Authority} from "../shared/authority";

@Injectable({
  providedIn: 'root'
})
export class AbiiGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.authorities?.length) return false;
    return currentUser.authorities.includes(Authority.ADMIN) || currentUser.authorities.includes(Authority.USER_SELLER);
  }
}
