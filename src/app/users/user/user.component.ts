import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../users.service";
import {User} from "../dto/user";
import {UserUpdateDto} from "../dto/user-update.dto";
import {Authority} from "../../shared/authority";
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientsService} from "../../clients/clients.service";
import {Client} from "../../clients/dto/client";
import {OrderCreateDto} from "../../orders/dto/order-create.dto";
import {OrdersService} from "../../orders/orders.service";
import {Order} from "../../orders/dto/order";
import {ConfirmService} from "../../features/confirm/confirm.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: User;
  userUpdateDto = new UserUpdateDto();
  authorities = Authority;
  availableClients: Client[] = [];
  orders: Order[] = [];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private clientsService: ClientsService,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.clientsService.getClients({userId: null})
      .subscribe(clients => this.availableClients = clients);

    this.route.params
      .subscribe(params => {
        const call = params["id"] ? this.usersService.getUser(params["id"]) : this.usersService.getMe();
        call.subscribe({
          next: (user) => {
            this.user = user;
            this.userUpdateDto = {
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              authorities: user.authorities,
              activated: user.activated,
              client: user.client
            };

            if (user.client) {
              this.ordersService.getOrders({clientId: user.client.id, allowIncomplete: true, allowRefunded: true})
                .subscribe(orders => this.orders = orders);
            }
          },
          error: () => {
            this.router.navigate(["/404"])
              .then(() => this.snackBar.open("Impossible de récupérer l'utilisateur"));
          }
        });
      });
  }

  canUpdateAdmin() {
    return this.authService.getCurrentUser()?.authorities?.includes(Authority.ADMIN);
  }

  canUpdateClient() {
    return this.authService.getCurrentUser()?.authorities
      ?.some(authority => authority === Authority.ADMIN || authority === Authority.USER_SELLER);
  }

  unlink() {
    this.usersService.updateUser(this.user.id, {
      client: null
    }).subscribe({
      next: (user) => {
        this.user = {...user};
        this.snackBar.open("Utilisateur déconnecté");
      },
      error: () => this.snackBar.open("Impossible de délier l'utilisateur")
    });
  }

  save() {
    this.usersService.updateUser(this.user.id, this.userUpdateDto)
      .subscribe({
        next: (user) => {
          this.user = {...user};
          this.snackBar.open("Utilisateur mis à jour");
        },
        error: () => this.snackBar.open("Impossible de mettre à jour l'utilisateur")
      });
  }

  createOrder($event: OrderCreateDto) {
    this.confirmService.open({
      title: "Souhaitez-vous créer une commande ?",
      message: "Cette action n'entrainera pas un débit de votre solde.",
      onConfirm: () => {
        this.ordersService.addOrder($event)
          .subscribe({
            next: (order) => {
              this.router.navigate(["/orders", order.id])
                .then(() => this.snackBar.open("Commande créée"))
            },
            error: () => this.snackBar.open("Impossible de créer la commande")
          });
      }
    })
  }

  goBack() {
    this.location.back();
  }
}
