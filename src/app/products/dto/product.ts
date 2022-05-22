import {ProductType} from "../../shared/product-type";

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
}
