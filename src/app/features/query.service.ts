import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class QueryService {
  private provider = "QueryService";

  constructor(private loggingService: LoggingService) {
    this.loggingService.log(this.provider, "init");
  }

  encode<T extends {}>(object?: T) {
    let params = new HttpParams();
    if (!object) return params;

    for (const [key, value] of Object.entries<keyof T>(object)) {
      if (typeof value === "symbol" || value === undefined) continue;
      params = params.append(key, value);
    }

    return params;
  }
}
