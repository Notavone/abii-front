import {OrderLine} from "./order-line";
import {Client} from "../../clients/dto/client";
import {User} from "../../users/dto/user";

export class Order {
  readonly id!: number;
  readonly orderLines!: OrderLine[];
  readonly client?: Client;
  readonly seller?: User;
  readonly clientId?: number
  readonly total!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly editable!: boolean;
  readonly refunded!: boolean;
}
