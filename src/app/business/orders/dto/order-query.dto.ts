export class OrderQueryDto {
  fromTimestamp?: number
  toTimestamp?: number
  clientId?: number
  productId?: number
  allowRefunded?: boolean;
  allowIncomplete?: boolean
}
