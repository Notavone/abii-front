import {Component, Input, OnInit} from '@angular/core';
import {PaymentType} from "../shared/payment-type";
import {Client} from "../shared/client";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-balance-form',
  templateUrl: './client-balance-form.component.html',
  styleUrls: ['./client-balance-form.component.scss']
})
export class ClientBalanceFormComponent implements OnInit {
  @Input() client?: Client;
  public paymentType = PaymentType;
  public selectedPaymentType = PaymentType.CASH;
  public amount = 0;

  constructor(private clientService: ClientService, private router: Router) {
  }

  adjustedValue() {
    return this.selectedPaymentType !== PaymentType.BALANCE ? Math.abs(this.amount) : Math.abs(this.amount) * -1;
  }

  ngOnInit(): void {
  }

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
  }

  adjust() {
    if(!this.client) throw new Error("Should not happen.");
    this.clientService.adjust(this.client, this.selectedPaymentType, this.adjustedValue())
      .subscribe(_ => this.reload());
  }
}
