import { Component, OnInit } from "@angular/core";
import { InitPasswordResetDto } from "../../business/auth/dto/init-password-reset.dto";
import { FinishPasswordResetDto } from "../../business/auth/dto/finish-password-reset.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../business/users/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";

enum View {
  INIT,
  AFTER_INIT,
  FINISH
}

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss"],
})
export class ResetComponent implements OnInit {
  View = View;
  activeView: View = View.INIT;
  initPasswordResetDto: InitPasswordResetDto = new InitPasswordResetDto();
  finishPasswordResetDto: FinishPasswordResetDto = new FinishPasswordResetDto();
  confirmPassword: string = "";
  isLoading: boolean = false;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        if (params.get("resetKey")) {
          this.finishPasswordResetDto.resetKey = params.get("resetKey")!;
          this.activeView = View.FINISH;
        }
      });
  }

  initPasswordReset($event: SubmitEvent) {
    $event.preventDefault();
    this.isLoading = true;
    this.usersService.initPasswordReset(this.initPasswordResetDto)
      .subscribe(() => {
        this.activeView = View.AFTER_INIT;
        this.isLoading = false;
      });
  }

  finishPasswordReset($event: SubmitEvent) {
    $event.preventDefault();

    if (this.finishPasswordResetDto.password !== this.confirmPassword) {
      this.snackBar.open("Les mots de passe ne correspondent pas.");
      return;
    }

    this.isLoading = true;
    this.usersService.finishPasswordReset(this.finishPasswordResetDto)
      .subscribe({
        next: () => {
          this.snackBar.open("Votre mot de passe à été réinitialisé.");
          this.isLoading = false;
          this.router.navigate(["/login"]);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open("Impossible de modifier votre mot de passe.");
        },
      });
  }
}
