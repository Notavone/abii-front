import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {OverviewComponent} from "./overview.component";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {OrdersModule} from "../orders/orders.module";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";



@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    OrdersModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    CurrencyPipe
  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
