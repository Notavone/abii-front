import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Client } from "../dto/client";
import { ClientsService } from "../clients.service";

@Component({
  selector: "app-client-search",
  templateUrl: "./client-search.component.html",
  styleUrls: ["./client-search.component.scss"],
})
export class ClientSearchComponent implements OnInit, AfterViewInit {
  @ViewChild("paginator") paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay = ["name", "balance", "subscription"];
  isLoading: boolean = true;
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(
    private clientService: ClientsService,
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

  selectClient(client: Client) {
    this.clientSelected.emit(client);
  }
}
