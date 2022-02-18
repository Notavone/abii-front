import {PaymentType} from "./payment-type";

export interface BalanceUpdateEvent {
  type: PaymentType,
  amount: number
}
