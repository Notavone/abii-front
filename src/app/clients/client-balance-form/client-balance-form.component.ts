import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentType} from "../shared/payment-type";
import {Client} from "../shared/client";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {BalanceUpdateEvent} from "../shared/balance-update-event";

@Component({
  selector: 'app-client-balance-form',
  templateUrl: './client-balance-form.component.html',
  styleUrls: ['./client-balance-form.component.scss']
})
export class ClientBalanceFormComponent {
  @Input() client?: Client;
  @Output() balanceChange = new EventEmitter<BalanceUpdateEvent>();
  public paymentType = PaymentType;
  public selectedPaymentType = PaymentType.CASH;
  public amount = 0;

  constructor(private dialog: MatDialog) {
  }

  adjustedValue() {
    return this.selectedPaymentType !== PaymentType.BALANCE ? Math.abs(this.amount) : Math.abs(this.amount) * -1;
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
          this.balanceChange.emit({type: this.selectedPaymentType, amount: this.adjustedValue()});
          this.amount = 0;
          this.selectedPaymentType = PaymentType.CASH;
        }
      });
  }
}
