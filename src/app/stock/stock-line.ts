import {Product} from "../products/dto/product";

export class StockLine {
  product!: Product;
  stock?: number;
  alert?: number;
}
