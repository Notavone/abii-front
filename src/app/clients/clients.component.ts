import {Component, OnInit} from '@angular/core';
import {Client} from "./shared/client";
import {ClientService} from "./shared/client.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay = ["name", "balance", "subscription"];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  set filter(value: string) {
    this.clients.filter = value;
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients.data = clients);
  }
}
