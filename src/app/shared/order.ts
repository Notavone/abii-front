import {OrderLine} from "./order-line";

export class Order {
  _id: string;
  lines: OrderLine[];
  total: number;
  client: string;
  date: number;

  constructor(_id?: string, lines?: OrderLine[], total?: number, client?: string, date?: number) {
    this._id = _id ?? '';
    this.lines = lines ?? [];
    this.total = total ?? 0;
    this.client = client ?? '';
    this.date = date ?? 0;
  }
}
