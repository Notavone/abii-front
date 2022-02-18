import {Client} from "./client";
import {OrderLine} from "../../orders/shared/order-line";

export interface OrderCreatedEvent {
  client: Client,
  lines: OrderLine[]
}
