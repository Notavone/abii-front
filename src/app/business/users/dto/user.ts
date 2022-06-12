import {Authority} from "../../auth/authority";
import {Client} from "../../clients/dto/client";

export class User {
  readonly id!: number;
  readonly email!: string;
  readonly password!: string;
  readonly activated!: boolean;
  readonly username!: string;
  readonly firstName!: string;
  readonly lastName!: string;
  readonly authorities?: Authority[];
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly name!: string;
  readonly client?: Client;
  readonly clientId?: number;
}
