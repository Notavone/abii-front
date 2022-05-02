import {UserCreateDto} from "./user-create.dto";
import {Authority} from "../../shared/authority";
import {Client} from "../../clients/dto/client";

export class UserUpdateDto implements Partial<UserCreateDto> {
  username?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  authorities?: Authority[];
  activated?: boolean;
  client?: Client | null;
}
