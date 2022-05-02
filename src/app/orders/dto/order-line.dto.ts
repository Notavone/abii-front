import {Product} from "../../products/dto/product";

export class OrderLineDto {
  readonly id!:number;
  readonly product!:Product;
  readonly quantity!:number;
}
