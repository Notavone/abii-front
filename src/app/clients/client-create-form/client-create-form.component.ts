import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/clients/shared/client.service';
import {Client} from "../shared/client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-create-form',
  templateUrl: './client-create-form.component.html',
  styleUrls: ['./client-create-form.component.scss']
})
export class ClientCreateFormComponent implements OnInit {
  client: Client = {
    subscriptionEnd: 0,
    _id: "",
    name: "",
    balance: 0,
  }

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
  }

  save() {
    this.clientService.addClient(this.client)
      .subscribe(client => this.router.navigate([`/clients/${client._id}`]))
  }

}
