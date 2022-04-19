import {PaymentType} from "../shared/payment-type";

export interface BalanceUpdateEvent {
  type: PaymentType,
  amount: number
}
