import {Product} from "../../products/shared/product";

export interface OrderLine {
  product: Product,
  qty: number
}
