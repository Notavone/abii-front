import { Component, OnInit } from "@angular/core";
import { ClientsService } from "./clients.service";
import { ClientCreateDto } from "./dto/client-create.dto";
import { Router } from "@angular/router";
import { ConfirmService } from "../../features/confirm/confirm.service";
import { tap } from "rxjs";
import { Client } from "./dto/client";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
  client: ClientCreateDto = new ClientCreateDto();
  isLoading: boolean = false;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    this.confirmService.open({
      title: "Ajouter un client",
      message: "Voulez-vous ajouter un client ?",
      onConfirm: () => {
        this.isLoading = true;
        this.clientService.addClient(this.client)
          .pipe(tap(() => this.isLoading = false))
          .subscribe(client => this.router.navigate([`/clients/${client.id}`]));
      },
    });
  }

  openClientDetails($event: Client): Promise<boolean> {
    return this.router.navigate([`/clients/${$event.id}`]);
  }
}
