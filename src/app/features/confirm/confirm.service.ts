import {Injectable} from '@angular/core';
import {ConfirmDataModel} from "./confirm-data.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "./confirm.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) {
  }

  open(data: ConfirmDataModel) {
    this.dialog.open(ConfirmComponent, {
      data: data
    })
  }
}
