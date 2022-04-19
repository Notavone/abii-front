import {Client} from "../shared/client";
import {Order} from "../shared/order";

export interface OrderEvent {
  client: Client,
  order: Order
}
