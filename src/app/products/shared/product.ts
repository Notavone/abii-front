import {ProductType} from "./product-type";

export interface Product {
  _id: string,
  type: ProductType,
  name: string,
  price: number,
  price_red: number,
  available: boolean
}
