import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from "../shared/client";
import {ClientService} from '../shared/client.service';

@Component({
  selector: 'app-client-cast',
  templateUrl: './client-cast.component.html',
  styleUrls: ['./client-cast.component.scss']
})
export class ClientCastComponent implements OnInit, OnChanges {
  @Input() id: string = "";
  client?: Client;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.id) {
      this.clientService.getClient(this.id)
        .subscribe(client => this.client = client);
    }
  }


}
