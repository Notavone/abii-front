import {Client} from "../../clients/shared/client";
import {Order} from "./order";

export interface OrderEvent {
  client: Client,
  order: Order
}
