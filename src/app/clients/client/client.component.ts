import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ClientService} from "../shared/client.service";
import {Client} from "../shared/client";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client?: Client;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private location: Location) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    let id = "" + this.route.snapshot.paramMap.get("id");
    this.clientService.getClient(id)
      .subscribe(client => this.client = client);
  }

  goBack(): void {
    this.location.back();
  }

  update() {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.updateClient(this.client)
      .subscribe(_ => this.goBack());
  }

  delete() {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.deleteClient(this.client)
      .subscribe(_ => this.goBack());
  }
}
