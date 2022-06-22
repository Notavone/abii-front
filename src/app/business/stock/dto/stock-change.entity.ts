import { Product } from "../../products/dto/product";
import { User } from "../../users/dto/user";

export class StockChange {
  readonly id!: number;
  readonly productId?: number;
  readonly product?: Product;
  readonly userId?: number;
  readonly user?: User;
  readonly previousStock!: number;
  readonly newStock!: number;
  readonly createdAt!: Date;
  readonly difference!: number;
}
