import {ProductCreateDto} from "./product-create.dto";
import {ProductType} from "../product-type";
import { ProductCategory } from "./product-category";

export class ProductUpdateDto implements Partial<ProductCreateDto> {
  name?: string;
  price?: number;
  price_red?: number;
  type?: ProductType;
  available?: boolean;
  image?: string;
  stock?: number;
  useStock?: boolean;
  alert?: number;
  buyPrice?: number;
  categories?: ProductCategory[];
}
