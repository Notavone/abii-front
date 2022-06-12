import {Component} from '@angular/core';
import {AuthService} from '../../business/auth/auth.service';
import {Router} from "@angular/router";
import {LoginDto} from "../../business/auth/dto/login.dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginDto: LoginDto = new LoginDto();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  login($event: Event) {
    $event.preventDefault();
    this.authService.login(this.loginDto.email, this.loginDto.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 401) this.snackBar.open('Mail ou mot de passe incorrect.');
        }
      });
  }
}
