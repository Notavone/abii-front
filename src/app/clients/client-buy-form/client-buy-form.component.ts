import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../shared/client";
import {ProductService} from "../../products/shared/product.service";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";
import {ProductType} from "../../products/shared/product-type";
import {Product} from "../../products/shared/product";
import {MatListOption} from "@angular/material/list";
import {OrderLine} from "../../orders/shared/order-line";

@Component({
  selector: 'app-client-buy-form',
  templateUrl: './client-buy-form.component.html',
  styleUrls: ['./client-buy-form.component.scss']
})
export class ClientBuyFormComponent implements OnInit {
  @Input() client!: Client;
  productType = ProductType;
  products: Product[] = [];
  selected: MatListOption[] = [];
  lines: OrderLine[] = []

  constructor(private clientService: ClientService, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  updateLines() {
    let map = this.selected.map(u => u as unknown as Product);
    this.lines = this.lines.filter(l => map.map(p => p._id).includes(l.product._id));
    for (let product of map) {
      if (this.lines.map(l => l.product).indexOf(product) < 0) this.lines.push({product, qty: 1});
    }
  }

  isSubscribed() {
    return Date.now() < this.client.subscriptionEnd;
  }

  getTotal() {
    let isSubscribed = this.isSubscribed();
    return this.lines.reduce((acc: number, cur: OrderLine) => acc + (isSubscribed ? cur.product.price - cur.product.price * cur.product.discount / 100 : cur.product.price) * cur.qty, 0);
  }

  reload(): void {
    let url = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(_ => this.router.navigate([url]));
  }

  private getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  add(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty++;
  }

  subtract(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty--;
    if (this.lines[id].qty < 1) {
      this.lines = this.lines.filter(l => l.product !== product);
      this.selected = this.selected.filter(o => o as unknown as Product != product);
    }
  }

  reset(product: Product) {
    let id = this.lines.map(l => l.product).indexOf(product);
    if (id >= 0) this.lines[id].qty = 1;
  }

  filterBy(type: ProductType) {
    return this.products.filter(p => p.type === type);
  }

  makeTransaction() {
    this.clientService.makeTransaction(this.client, this.lines)
      .subscribe(_ => this.reload());
  }
}
