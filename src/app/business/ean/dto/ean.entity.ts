import { Product } from "../../products/dto/product";
import { EanUpdateDto } from "./ean-update.dto";
import { EanCreateDto } from "./ean-create.dto";

export class Ean {
  readonly id!: number;
  readonly product?: Product;
  readonly productId?: number;
  readonly value!: string;
  readonly quantity!: number;
  readonly comment?: string;
}

type MappedEanDto = EanUpdateDto | EanCreateDto

export class MappedEan {

  constructor(public ean: Ean, public dto: MappedEanDto) {
  }
}
