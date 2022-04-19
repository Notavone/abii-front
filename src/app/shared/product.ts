import {ProductType} from "./product-type";

export class Product {
  _id: string;
  type: ProductType;
  name: string;
  price: number;
  price_red: number;
  available: boolean

  constructor(_id?: string, type?: ProductType, name?: string, price?: number, price_red?: number, available?: boolean) {
    this._id = _id ?? '';
    this.type = type ?? ProductType.PRODUCT_FOOD;
    this.name = name ?? '';
    this.price = price ?? 0;
    this.price_red = price_red ?? 0;
    this.available = available ?? false;
  }
}
