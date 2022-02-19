import {Injectable} from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private provider = "QueryService";

  constructor(private loggingService: LoggingService) {
    this.loggingService.log(this.provider, "init");
  }

  encode<T extends Object>(params: T): string {
    let query = "?";
    let encodedParams: string[] = [];
    for (let paramsKey in params) {
      encodedParams.push(encodeURI(paramsKey) + "=" + encodeURI(String(params[paramsKey])));
    }
    return query + encodedParams.join("&");
  }
}
