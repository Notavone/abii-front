import {ProductCreateDto} from "./product-create.dto";
import {ProductType} from "../product-type";

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
}
