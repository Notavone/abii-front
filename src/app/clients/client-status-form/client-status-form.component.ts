import {Component, Input} from '@angular/core';
import {Client} from "../shared/client";
import {Status} from "../shared/status";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-status-form',
  templateUrl: './client-status-form.component.html',
  styleUrls: ['./client-status-form.component.scss']
})
export class ClientStatusFormComponent {
  @Input() client?: Client;
  status = Status;

  constructor(private clientService: ClientService, private router: Router) {
  }

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
  }

  isSubscribed() {
    if (!this.client) throw "Should not happen.";
    return Date.now() < this.client.subscriptionEnd
  }

  updateStatus(status: Status) {
    if (!this.client) throw new Error("Should not happen.");
    this.clientService.updateStatus(this.client, status)
      .subscribe(_ => this.reload());
  }

}
