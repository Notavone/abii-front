import {Client} from "../shared/client";
import {OrderLine} from "../shared/order-line";

export interface OrderCreatedEvent {
  client: Client,
  lines: OrderLine[]
}
