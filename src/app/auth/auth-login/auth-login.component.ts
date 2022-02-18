import {Component} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.email, this.password);
    return this.router.navigate(['/']);
  }
}
