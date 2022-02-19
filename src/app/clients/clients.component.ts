import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "./shared/client";
import {ClientService} from "./shared/client.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  @ViewChild("paginator") paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay = ["name", "balance", "subscription"];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe(clients => this.dataSet.data = clients);
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSet.sort = this.sort;
    if (this.paginator) this.dataSet.paginator = this.paginator;
  }

  set filter(value: string) {
    this.dataSet.filter = value;
  }
}
