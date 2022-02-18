import {OrderLine} from "./order-line";

export interface Order {
  _id: string,
  lines: OrderLine[],
  total: number,
  client: string
}
