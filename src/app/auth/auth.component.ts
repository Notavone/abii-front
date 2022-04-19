import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.email, this.password);
    return this.router.navigate(['/']);
  }
}
