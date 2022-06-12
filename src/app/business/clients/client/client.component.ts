import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../clients.service";
import {Client} from "../dto/client";
import {Status} from "../status";
import {ClientUpdateDto} from "../dto/client-update.dto";
import {Product} from "../../products/dto/product";
import {ProductType} from "../../products/product-type";
import {ProductsService} from "../../products/products.service";
import {CurrencyPipe, Location} from "@angular/common";
import {OrdersService} from "../../orders/orders.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Order} from "../../orders/dto/order";
import {ConfirmService} from "../../../features/confirm/confirm.service";
import {AuthService} from "../../auth/auth.service";
import {Authority} from "../../auth/authority";
import {OrderCreateDto} from "../../orders/dto/order-create.dto";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client!: Client;
  updateDto!: ClientUpdateDto;
  updateDtoOriginal!: ClientUpdateDto;
  orders: Order[] = [];
  status = Status;
  id!: number;

  productType = ProductType;
  products: Product[] = [];
  paymentIsAdditive: boolean = true;
  _amount: number = 0;
  isLoading: boolean = true;

  constructor(
    private clientService: ClientsService,
    private ordersService: OrdersService,
    private snackbar: MatSnackBar,
    private productService: ProductsService,
    private currencyPipe: CurrencyPipe,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private confirmService: ConfirmService,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params) => {
        if (!params.has('id')) this.router.navigate(['/404']);
        const id = +params.get('id')!;
        this.clientService.getClient(+id)
          .subscribe({
            next: (client) => {
              this.client = client;

              this.updateDto = {name: client.name}
              this.updateDtoOriginal = {...this.updateDto};

              this.ordersService.getOrders({clientId: client.id, allowIncomplete: true, allowRefunded: true})
                .subscribe(orders => {
                  this.orders = orders
                  this.isLoading = false;
                });
            },
            error: () => this.router.navigate(["/404"])
          });
      });

    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  get amount() {
    return this._amount;
  }

  get amountPositive() {
    return Math.abs(this._amount);
  }

  set amount(value: number) {
    if (this.paymentIsAdditive) this._amount = Math.abs(value);
    else this._amount = -Math.abs(value);
  }

  goBack() {
    return this.location.back();
  }

  get dtoHasChanged() {
    return JSON.stringify(this.updateDto) !== JSON.stringify(this.updateDtoOriginal);
  }

  update() {
    this.confirmService.open({
      title: "Mettre à jour le client",
      message: "Voulez-vous vraiment mettre à jour le client ?",
      onConfirm: () => {
        this.clientService.updateClient(this.client.id, this.updateDto)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.updateDtoOriginal = {...this.updateDto};
              this.snackbar.open("Client mis à jour");
            },
            error: () => this.snackbar.open("Impossible de mettre à jour ce client")
          });
      }
    })
  }

  delete() {
    this.confirmService.open({
      title: "Supprimer le client",
      message: "Êtes-vous sûr de vouloir supprimer ce client ?",
      onConfirm: () => {
        this.clientService.deleteClient(this.client.id)
          .subscribe({
            next: () => {
              this.snackbar.open("Client supprimé");
              this.goBack();
            },
            error: () => this.snackbar.open("Impossible de supprimer ce client")
          });
      }
    })
  }

  get isSubscribed() {
    return Date.now() < new Date(this.client.subscribedUntil).getTime();
  }

  updateBalance() {
    this.confirmService.open({
      title: "Modifier le solde",
      onConfirm: () => {
        this.clientService.updateBalance(this.client.id, this.client.balance + this.amount)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.snackbar.open("Client mis à jour");
            },
            error: () => this.snackbar.open("Impossible de mettre à jour le solde")
          });
        this.amount = 0;
      }
    });
  }

  updateStatus(status: Status) {
    this.confirmService.open({
      title: "Mettre à jour l'adhésion d'un client",
      onConfirm: () => {
        this.clientService.updateStatus(this.client.id, new Date(Date.now() + status))
          .subscribe({
            next: (client) => {
              this.client = client;
              this.snackbar.open("Client mis à jour")
            },
            error: () => this.snackbar.open("Impossible de modifier le statut de ce client")
          })
      }
    })
  }

  updatePaymentValue() {
    this.paymentIsAdditive = !this.paymentIsAdditive;
    if (this.paymentIsAdditive) this.amount = Math.abs(this.amount);
    else this.amount = -Math.abs(this.amount);
  }

  isAbii() {
    let currentUser = this.authService.getCurrentUser();
    return currentUser?.authorities?.includes(Authority.USER_SELLER) || currentUser?.authorities?.includes(Authority.ADMIN);
  }

  confirm(orderCreateDto: OrderCreateDto) {
    this.confirmService.open({
      title: "Confirmer la commande",
      message: "Êtes-vous sûr de vouloir confirmer cette commande ?",
      onConfirm: () => {
        this.ordersService.addOrder(orderCreateDto)
          .subscribe({
            next: (order) => {
              this.orders.push(order);
              this.ordersService.confirmOrder(order)
                .subscribe({
                  next: (confirmedOrder) => {
                    this.client = {...this.client, balance: this.client.balance - order.total};
                    this.orders.splice(this.orders.indexOf(order), 1, confirmedOrder);
                    this.snackbar.open("Commande créée et confirmée");
                  },
                  error: () => this.snackbar.open("Une erreur s'est produite lors de la confirmation de la commande")
                });
            },
            error: () => this.snackbar.open("Une erreur est survenue lors de la création de la commande")
          });
      }
    })
  }
}
