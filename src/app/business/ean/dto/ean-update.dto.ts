import { Ean } from "./ean.entity";

export class EanUpdateDto {
  constructor(ean: Ean) {
    this.productId = ean.productId;
    this.value = ean.value;
    this.quantity = ean.quantity;
    this.comment = ean.comment;
  }

  productId?: number | null;
  value?: string;
  quantity?: number;
  comment?: string;
}
