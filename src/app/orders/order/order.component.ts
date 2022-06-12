import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../dto/order";
import {OrdersService} from "../orders.service";
import {AuthService} from "../../auth/auth.service";
import {OrderCreateDto} from "../dto/order-create.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Authority} from "../../auth/authority";
import {ConfirmService} from "../../features/confirm/confirm.service";
import {CurrencyPipe, Location} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order!: Order;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe,
    private confirmService: ConfirmService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        if (!params.has('id')) this.router.navigate(['/404']);
        const id = params.get('id')!;
        this.ordersService.getOrder(+id)
          .subscribe({
            next: order => {
              this.order = order;
              this.isLoading = false;
            },
            error: () => this.router.navigate(['/404'])
          });
      });
  }

  update($event: OrderCreateDto) {
    this.confirmService.open({
      title: "Mettre à jour la commande",
      message: `Voulez-vous vraiment mettre à jour la commande ${this.order.id} ?`,
      onConfirm: () => {
        this.ordersService.updateOrder({orderLines: $event.orderLines, id: this.order.id})
          .subscribe({
            next: order => {
              this.order = order;
              this.snackBar.open('Commande mise à jour');
            },
            error: () => this.router.navigate(['/404'])
          });
      }
    })
  }

  canManageOrder() {
    let currentUser = this.authService.getCurrentUser();
    return currentUser?.authorities?.includes(Authority.ADMIN) || currentUser?.authorities?.includes(Authority.USER_SELLER);
  }

  confirm() {
    this.confirmService.open({
      title: 'Confirmer la commande',
      message: `Voulez-vous confirmer la commande ? Ce client sera débité de la somme de ${this.currencyPipe.transform(this.order.total)}.`,
      onConfirm: () => {
        this.ordersService.confirmOrder(this.order)
          .subscribe({
            next: order => {
              this.order = order;
              this.snackBar.open('Commande confirmée');
            },
            error: () => this.snackBar.open('Erreur lors de la confirmation de la commande')
          });
      }
    })
  }

  goBack() {
    this.location.back();
  }

  refund() {
    this.confirmService.open({
      title: 'Confirmation de remboursement',
      message: `Êtes-vous sûr de vouloir rembourser cette commande ? Ce client sera crédité de la somme de ${this.currencyPipe.transform(this.order.total)}`,
      onConfirm: () => {
        this.ordersService.refundOrder(this.order)
          .subscribe({
            next: order => {
              this.order = order;
              this.snackBar.open('Commande remboursée');
            },
            error: () => this.snackBar.open('Erreur lors du remboursement de la commande')
          });
      }
    })
  }
}
