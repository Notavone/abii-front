import {ClientCreateDto} from "./client-create.dto";

export class ClientUpdateDto implements Partial<ClientCreateDto> {
  name?: string;
  balance?: number;
  subscribedUntil?: Date;
}
