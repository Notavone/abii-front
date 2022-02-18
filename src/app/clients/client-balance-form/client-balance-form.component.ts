import {Component, Input} from '@angular/core';
import {PaymentType} from "../shared/payment-type";
import {Client} from "../shared/client";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-client-balance-form',
  templateUrl: './client-balance-form.component.html',
  styleUrls: ['./client-balance-form.component.scss']
})
export class ClientBalanceFormComponent {
  @Input() client?: Client;
  public paymentType = PaymentType;
  public selectedPaymentType = PaymentType.CASH;
  public amount = 0;

  constructor(private clientService: ClientService, private router: Router, public dialog: MatDialog) {
  }

  adjustedValue() {
    return this.selectedPaymentType !== PaymentType.BALANCE ? Math.abs(this.amount) : Math.abs(this.amount) * -1;
  }

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
  }

  updateBalance() {
    if (!this.client) throw new Error("Should not happen.");
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Modifier le solde",
        text: "Voulez vous vraiment effectuer cette action ?"
      }
    }).afterClosed()
      .subscribe(response => {
        if (response as unknown as boolean) {
          if (!this.client) throw new Error("Should not happen.");
          this.clientService.updateBalance(this.client, this.selectedPaymentType, this.adjustedValue())
            .subscribe(_ => this.reload());
        }
      });
  }
}
