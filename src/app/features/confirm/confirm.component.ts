import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmDataModel } from "./confirm-data.model";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"],
})
export class ConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDataModel) {
  }

  confirm() {
    if (this.data.onConfirm) this.data.onConfirm();
  }

  cancel() {
    if (this.data.onCancel) this.data.onCancel();
  }
}
