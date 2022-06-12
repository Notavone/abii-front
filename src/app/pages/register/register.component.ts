import {Component, OnInit} from '@angular/core';
import {UserCreateDto} from "../../business/users/dto/user-create.dto";
import {UsersService} from "../../business/users/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userCreateDto: UserCreateDto = new UserCreateDto();
  confirmPassword: string = "";

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  register($event: Event) {
    $event.preventDefault();

    if (this.userCreateDto.password !== this.confirmPassword) {
      this.snackBar.open("Les mots de passe ne correspondent pas");
      return;
    }

    this.userService.createUser(this.userCreateDto)
      .subscribe({
        next: () => {
          this.router.navigate(['/'])
            .then(() => this.snackBar.open("Vérifiez votre boite mail"));
        },
        error: (err) => this.snackBar.open("Erreur lors de l'inscription")
      })
  }
}
