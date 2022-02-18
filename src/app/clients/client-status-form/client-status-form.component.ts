import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Client} from "../shared/client";
import {Status} from "../shared/status";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-client-status-form',
  templateUrl: './client-status-form.component.html',
  styleUrls: ['./client-status-form.component.scss']
})
export class ClientStatusFormComponent {
  @Input() client?: Client;
  @Output() statusUpdated = new EventEmitter<Status>();
  status = Status;

  constructor(private dialog: MatDialog) {
  }

  isSubscribed() {
    if (!this.client) throw "Should not happen.";
    return Date.now() < this.client.subscriptionEnd
  }

  updateStatus(status: Status) {
    if (!this.client) throw new Error("Should not happen.");
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Mettre à jour l'adhésion d'un client",
        text: "Êtes vous sûr de vouloir effectuer cette action ?"
      }
    }).afterClosed()
      .subscribe(response => {
        if (response as unknown as boolean) {
          if (!this.client) throw new Error("Should not happen.");
          this.statusUpdated.emit(status);
        }
      });
  }

}
