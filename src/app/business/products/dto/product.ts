import {ProductType} from "../product-type";
import {ProductCategory} from "./product-category";

export class Product {
  readonly id!: number;
  readonly name!: string;
  readonly price!: number;
  readonly price_red!: number;
  readonly available!: boolean;
  readonly type!: ProductType;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly image?: string;
  readonly stock!: number;
  readonly alert!: number;
  readonly useStock!: boolean;
  readonly sellable!: boolean;
  readonly categoriesIds!: number[];
  readonly categories?: ProductCategory[]; // fourni par GET /api/products/:id
  readonly buyPrice!: number;
}
