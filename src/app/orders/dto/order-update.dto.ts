import {OrderLineCreateDto} from "./order-line-create.dto";

export class OrderUpdateDto {
  id!: number;
  orderLines!: OrderLineCreateDto[];
}
