import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Client} from "../../clients/dto/client";
import {Product} from "../../products/dto/product";
import {ProductsService} from "../../products/products.service";
import {ProductType} from "../../shared/product-type";
import {ClientsService} from "../../clients/clients.service";
import {OrderLineCreateDto} from "../dto/order-line-create.dto";
import {OrderCreateDto} from "../dto/order-create.dto";
import {Order} from "../dto/order";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
  selector: 'app-order-taking',
  templateUrl: './order-taking.component.html',
  styleUrls: ['./order-taking.component.scss']
})
export class OrderTakingComponent implements OnInit {
  @ViewChild("expansionPanel") expansionPanel?: MatExpansionPanel;
  @Input() clientId!: number;
  @Input() order?: Order;
  @Output() onConfirm = new EventEmitter<OrderCreateDto>();

  client?: Client;

  productType = ProductType;
  products: Product[] = [];
  _selected: Product[] = [];
  orderLines: OrderLineCreateDto[] = [];
  orderLinesOriginal: OrderLineCreateDto[] = [];
  productsWhichLineQuantityAreOverStock: number[] = [];

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
              let line = {
                productId: product.id,
                quantity: orderLine.quantity
              };
              this.orderLines.push(line);
              this.updateOutOfStockStatus(line, product);
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
    return this.products.filter(product => product.type === productType && product.sellable);
  }

  isSubscribed() {
    return new Date(this.client?.subscribedUntil ?? 0) > new Date();
  }

  get selected() {
    return this._selected;
  }

  set selected(products: Product[]) {
    this._selected = products;
    if (this.expansionPanel && !this.selected.length) {
      this.expansionPanel.close();
    }

    this.orderLines = this.orderLines.filter(orderLine => this.selected.map(product => product.id).includes(orderLine.productId));
    for (const p of products.filter(product => !this.orderLines.map(orderLine => orderLine.productId).includes(product.id))) {
      let line = {
        productId: p.id,
        quantity: 1
      };
      this.orderLines.push(line);
      this.updateOutOfStockStatus(line, p);
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
      this.updateOutOfStockStatus(line, product);
    } else this.selected = [...this.selected, product];
  }

  decrementLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    if (line) {
      line.quantity--;
      if (line.quantity === 0) this.selected = this.selected.filter(p => p.id !== product.id);
      this.updateOutOfStockStatus(line, product);
    }
  }

  updateOutOfStockStatus(line: OrderLineCreateDto, product: Product) {
    if (line.quantity > product.stock) this.productsWhichLineQuantityAreOverStock = [...new Set([...this.productsWhichLineQuantityAreOverStock, product.id])];
    else this.productsWhichLineQuantityAreOverStock = this.productsWhichLineQuantityAreOverStock.filter(id => id !== product.id);
  }

  resetLine(product: Product) {
    const line = this.orderLines.find(orderLine => orderLine.productId === product.id);
    if (line) {
      line.quantity = 1;
      this.updateOutOfStockStatus(line, product);
    }
  }

  isLineOutOfStock(product: Product) {
    return this.productsWhichLineQuantityAreOverStock.includes(product.id);
  }

  toggleProductSelection(product: Product) {
    if (this.selected.includes(product)) {
      this.selected = this.selected.filter(p => p.id !== product.id);
    } else this.selected = [...this.selected, product];
  }

  isProductSelected(product: Product) {
    return this.selected.includes(product);
  }
}
