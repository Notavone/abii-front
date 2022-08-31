import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UsersService } from "../../business/users/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"],
})
export class ConfirmComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    const params: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    if (params.has("activationKey")) {
      this.usersService.confirmUser({ activationKey: params.get("activationKey")! })
        .subscribe(() => {
          this.router.navigate(["/login"])
            .then(() => this.snackBar.open("Votre compte à été activé, vous pouvez vous connecter"));
        });
    }
  }
}
