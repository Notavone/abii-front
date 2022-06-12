import {ProductUpdateDto} from "./product-update.dto";
import {Product} from "./product";

export class ProductBulkUpdateDto {
  products!: (ProductUpdateDto & Pick<Product, "id">)[];
  useTransaction!: boolean;
}
