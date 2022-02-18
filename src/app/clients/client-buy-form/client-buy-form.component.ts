import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../shared/client";
import {ProductService} from "../../products/shared/product.service";
import {ClientService} from "../shared/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../products/shared/product-type";
import {Product} from "../../products/shared/product";
import {MatListOption} from "@angular/material/list";
import {OrderLine} from "../../orders/shared/order-line";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {CurrencyPipe} from "@angular/common";
import {OrderService} from "../../orders/shared/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-client-buy-form',
  templateUrl: './client-buy-form.component.html',
  styleUrls: ['./client-buy-form.component.scss'],
})
export class ClientBuyFormComponent implements OnInit {
  @Input() client?: Client;
  productType = ProductType;
  products: Product[] = [];
  selected: MatListOption[] = [];
  lines: OrderLine[] = []

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit(): void {
    let id = "" + this.route.parent?.snapshot.paramMap.get("id");

    this.clientService.getClient(id)
      .subscribe(client => this.client = client);

    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  updateLines() {
    let map = this.selected.map(u => u as unknown as Product);
    this.lines = this.lines.filter(l => map.map(p => p._id).includes(l.product._id));
    for (let product of map) {
      if (this.lines.map(l => l.product).indexOf(product) < 0) this.lines.push({product, qty: 1});
    }
  }

  isSubscribed() {
    if (!this.client) throw "Should not happen.";
    return Date.now() < this.client.subscriptionEnd;
  }

  getTotal() {
    let isSubscribed = this.isSubscribed();
    return this.lines.reduce((acc: number, cur: OrderLine) => acc + (isSubscribed ? cur.product.price - cur.product.price * cur.product.discount / 100 : cur.product.price) * cur.qty, 0);
  }

  addQuantity(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty++;
  }

  subtractQuantity(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty--;
    if (this.lines[id].qty < 1) {
      this.lines = this.lines.filter(l => l.product !== product);
      this.selected = this.selected.filter(o => o as unknown as Product != product);
    }
  }

  resetQuantity(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty = 1;
  }

  filterBy(type: ProductType) {
    return this.products.filter(p => p.type === type);
  }

  sendOrder() {
    if (!this.client) throw new Error("Should not happen.");
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Confirmer un achat",
        text: `Ce client sera débité de ${this.currencyPipe.transform(this.getTotal())}`,
        confirm: "Payer"
      }
    }).afterClosed()
      .subscribe(response => {
        if (response as unknown as boolean) {
          if (!this.client) throw new Error("Should not happen.");
          this.orderService.addOrder(this.client, this.lines)
            .subscribe(ret => {
              this.client = ret.client;
              this.snackbar.open("Achat enregistré");
            });
          this.selected = [];
          this.updateLines();
        }
      });
  }
}
