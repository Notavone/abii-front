import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private datePipe: DatePipe) { }

  log(provider: string, message: string) {
    console.info(`${provider} | ${this.datePipe.transform(Date.now(), "hh:mm:ss")} : ${message}`);
  }
}
