import {OrderLineInDb} from "./order-line-in-db";

export interface Order {
  _id: string,
  lines: OrderLineInDb[],
  total: number,
  client: string
}
