import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from "../../clients/dto/client";
import {Product} from "../../products/dto/product";
import {ProductsService} from "../../products/products.service";
import {ProductType} from "../../shared/product-type";
import {ClientsService} from "../../clients/clients.service";
import {OrderLineCreateDto} from "../dto/order-line-create.dto";
import {OrderCreateDto} from "../dto/order-create.dto";
import {Order} from "../dto/order";

@Component({
  selector: 'app-order-taking',
  templateUrl: './order-taking.component.html',
  styleUrls: ['./order-taking.component.scss']
})
export class OrderTakingComponent implements OnInit {
  @Input() clientId!: number;
  @Input() order?: Order;
  @Output() onConfirm = new EventEmitter<OrderCreateDto>();

  client?: Client;

  productType = ProductType;
  products: Product[] = [];
  _selected: Product[] = [];
  orderLines: OrderLineCreateDto[] = [];
  orderLinesOriginal: OrderLineCreateDto[] = [];

  constructor(
    private productsService: ProductsService,
    private clientsService: ClientsService,
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(products => {
        this.products = products;
        if (this.order) {
          this.order.orderLines.forEach(orderLine => {
            const product = this.products.find(p => p.id === orderLine.product?.id);
            if (product) {
              this._selected.push(product);
              this.orderLines.push({
                productId: product.id,
                quantity: orderLine.quantity
              });
            }
          });
          this.orderLinesOriginal = [...this.orderLines];
        }
      });

    this.clientsService.getClient(this.clientId)
      .subscribe(client => this.client = client);
  }

  confirm() {
    this.onConfirm.emit({
      clientId: this.clientId,
      orderLines: this.orderLines
    });
    this.orderLinesOriginal = [...this.orderLines];
  }

  get dtoHasChanged(): boolean {
    return !!this.order && JSON.stringify(this.orderLines) !== JSON.stringify(this.orderLinesOriginal);
  }

  orderBy(productType: ProductType) {
    return this.products.filter(product => product.type === productType);
  }

  isSubscribed() {
    return new Date(this.client?.subscribedUntil ?? 0) > new Date();
  }

  get selected() {
    return this._selected;
  }

  set selected(products: Product[]) {
    this._selected = products;
    this.orderLines = this.orderLines.filter(orderLine => this.selected.map(product => product.id).includes(orderLine.productId));
    for (const p of products.filter(product => !this.orderLines.map(orderLine => orderLine.productId).includes(product.id))) {
      this.orderLines.push({
        productId: p.id,
        quantity: 1
      });
    }
  }

  total() {
    return this.selected.reduce((total, product) => total + this.totalForLine(product), 0)
  }

  totalForLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    return (line?.quantity ?? 0) * (this.isSubscribed() ? product.price_red : product.price);
  }

  quantityForLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    return line?.quantity ?? 0;
  }

  incrementLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    if (line) {
      line.quantity++;
    } else this.selected.push(product);
  }

  decrementLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    if (line) {
      line.quantity--;
      if (line.quantity === 0) this.selected = this.selected.filter(p => p.id !== product.id);
    }
  }

  resetLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    if (line) {
      line.quantity = 1;
    }
  }
}
