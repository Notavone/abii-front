import {Component, OnInit} from '@angular/core';
import {InitPasswordResetDto} from "../dto/init-password-reset.dto";
import {FinishPasswordResetDto} from "../dto/finish-password-reset.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users/users.service";

enum View {
  INIT,
  AFTER_INIT,
  FINISH
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  View = View;
  activeView: View = View.INIT;
  initPasswordResetDto: InitPasswordResetDto
  finishPasswordResetDto: FinishPasswordResetDto
  confirmPassword: string;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.initPasswordResetDto = new InitPasswordResetDto();
    this.finishPasswordResetDto = new FinishPasswordResetDto();
    this.confirmPassword = "";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        if(params.get("resetKey")) {
          this.finishPasswordResetDto.resetKey = params.get("resetKey")!;
          this.activeView = View.FINISH;
        }
      });
  }

  initPasswordReset($event: SubmitEvent) {
    $event.preventDefault();
    this.usersService.initPasswordReset(this.initPasswordResetDto)
      .subscribe(() => this.activeView = View.AFTER_INIT);
  }

  finishPasswordReset($event: SubmitEvent) {
    $event.preventDefault();
    this.usersService.finishPasswordReset(this.finishPasswordResetDto)
      .subscribe(() => this.router.navigate(["/login"]))
  }
}
