import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../clients.service";
import {Client} from "../../shared/client";
import {NavigationLink} from 'src/app/shared/navigation-link';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client?: Client;
  links: NavigationLink[] = [];
  activeLink: string = this.route.snapshot.url.join("/");

  constructor(private clientService: ClientsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let id = "" + this.route.snapshot.paramMap.get("id");

    this.clientService.getClient(id)
      .subscribe(client => {
        this.client = client;
        let navigationLinks = [
          {path: `/clients/${client._id}/params`, label: "Paramètres"},
          {path: `/clients/${client._id}/buy`, label: "Achats"},
          {path: `/clients/${client._id}/history`, label: "Historique"},
        ];
        this.links = navigationLinks;
        if(!navigationLinks.map(l => l.path).includes(this.activeLink)) {
          this.activeLink = navigationLinks[0].path;
          this.router.navigate([navigationLinks[0].path]);
        }
      });
  }
}
