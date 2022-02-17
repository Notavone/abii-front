import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() {
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
