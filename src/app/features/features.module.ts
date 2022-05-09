import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LoggingService} from "./logging.service";
import {QueryService} from "./query.service";
import {LoadingModule} from "./loading/loading.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingModule,
  ],
  providers: [
    DatePipe,
    LoggingService,
    QueryService,
  ]
})
export class FeaturesModule { }
