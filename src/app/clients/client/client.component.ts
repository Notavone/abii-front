import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ClientService} from "../shared/client.service";
import {Client} from "../shared/client";
import {Status} from "../shared/status";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client?: Client;
  status = Status;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private location: Location) {
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

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
  }

  setStatus(status: Status) {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.setStatus(this.client, status)
      .subscribe(_ => this.reload());
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
