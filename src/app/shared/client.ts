export class Client {
  _id: string;
  name: string;
  balance: number;
  subscriptionEnd: number;

  constructor(_id?: string, name?: string, balance?: number, subscriptionEnd?: number) {
    this._id = _id ?? '';
    this.name = name ?? '';
    this.balance = balance ?? 0;
    this.subscriptionEnd = subscriptionEnd ?? 0;
  }
}
