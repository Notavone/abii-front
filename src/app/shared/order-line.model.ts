import {Product} from "../products/dto/product";

export class OrderLineModel {
  product!: Product;
  quantity!: number;
}
