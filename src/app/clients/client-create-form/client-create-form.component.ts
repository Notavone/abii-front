import {Component} from '@angular/core';
import {ClientsService} from 'src/app/clients/clients.service';
import {Client} from "../../shared/client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-create-form',
  templateUrl: './client-create-form.component.html',
  styleUrls: ['./client-create-form.component.scss']
})
export class ClientCreateFormComponent {
  client: Client = {
    subscriptionEnd: 0,
    _id: "",
    name: "",
    balance: 0,
  }

  constructor(private clientService: ClientsService, private router: Router) {
  }

  save() {
    this.clientService.addClient(this.client)
      .subscribe(client => this.router.navigate([`/clients/${client._id}`]))
  }

}
