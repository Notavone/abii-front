import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "./dto/client";
import {ClientsService} from "./clients.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientCreateDto} from "./dto/client-create.dto";
import {Router} from "@angular/router";
import {ConfirmService} from "../../features/confirm/confirm.service";
import { tap } from "rxjs";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  @ViewChild("paginator") paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  client: ClientCreateDto = new ClientCreateDto();
  dataSet: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay = ["name", "balance", "subscription"];
  isLoading: boolean = true;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe(clients => {
        this.dataSet.data = clients;
        this.isLoading = false;
      });
  }

  ngAfterViewInit() {
    if (this.sort) this.dataSet.sort = this.sort;
    if (this.paginator) this.dataSet.paginator = this.paginator;
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
      }
    })
  }
}
