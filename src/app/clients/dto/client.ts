import {User} from "../../users/dto/user";

export class Client {
  readonly id!: number;
  readonly name!: string;
  readonly balance!: number
  readonly subscribedUntil!: Date;
  readonly userId?: number;
  readonly user?: User;
}
