import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderComponent} from "./order/order.component";
import {OrdersTableComponent} from "./orders-table/orders-table.component";
import {OrdersService} from "./orders.service";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FeaturesModule} from "../features/features.module";
import {OrdersComponent} from "./orders.component";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FeaturesModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    OrdersService
  ],
  exports: [
    OrdersTableComponent
  ],
})
export class OrdersModule {
}
