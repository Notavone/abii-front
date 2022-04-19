import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../../clients.service";
import {Client} from "../../../shared/client";
import {ConfirmComponent} from "../../../dialog/confirm/confirm.component";
import {BalanceUpdateEvent} from "../../balance-update-event";
import {Status} from "../../../shared/status";
import {MatDialog} from "@angular/material/dialog";
import {OrdersService} from "../../../orders/orders.service";

@Component({
  selector: 'app-client-params',
  templateUrl: './client-params.component.html',
  styleUrls: ['./client-params.component.scss']
})
export class ClientParamsComponent implements OnInit {
  @Input() client?: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private orderService: OrdersService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    let id = "" + this.route.parent?.snapshot.paramMap.get("id");

    this.clientService.getClient(id)
      .subscribe(client => this.client = client);
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  update() {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.updateClient(this.client)
      .subscribe(_ => this.goBack());
  }

  delete() {
    if (!this.client) throw new Error("Should not happen.");
    this.dialog.open(ConfirmComponent, {
      data: {
        title: "Supprimer un client",
        text: `Voulez vous vraiment supprimer le client "${this.client.name}" ?`,
        confirm: "Supprimer"
      }
    }).afterClosed()
      .subscribe(response => {
        if (response as unknown as boolean) {
          if (!this.client) throw new Error("Should not happen.");
          this.clientService.deleteClient(this.client)
            .subscribe(_ => this.goBack());
        }
      });
  }

  balanceChange(event: BalanceUpdateEvent) {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.updateBalance(this.client, event.type, event.amount)
      .subscribe(client => this.client = client);
  }

  statusUpdated(event: Status) {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.updateStatus(this.client, event)
      .subscribe(client => this.client = client);
  }
}
