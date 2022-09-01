import {ProductType} from "../product-type";

export class ProductCreateDto {
  name!: string;
  price!: number;
  price_red!: number;
  type!: ProductType;
  available!: boolean;
  image?: string;
  buyPrice?: number;
}
