import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LoggingService} from "./logging.service";
import {QueryService} from "./query.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe,
    LoggingService,
    QueryService,
  ]
})
export class FeaturesModule { }
