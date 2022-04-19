import {Product} from "./product";

export class OrderLine {
  product: Product;
  qty: number;

  constructor( product?: Product, qty?: number ) {
    this.product = product ?? new Product();
    this.qty = qty ?? 0;
  }
}
