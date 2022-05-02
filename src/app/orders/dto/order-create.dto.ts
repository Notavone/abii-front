import {OrderLineCreateDto} from "./order-line-create.dto";

export class OrderCreateDto {
  clientId!: number;
  orderLines!: OrderLineCreateDto[];
}
