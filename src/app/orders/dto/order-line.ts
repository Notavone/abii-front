import {Product} from "../../products/dto/product";

export class OrderLine {
  readonly id!: number;
  readonly quantity!: number;

  readonly orderId?: number;

  readonly product?: Product;
  readonly productId?: number;
}
