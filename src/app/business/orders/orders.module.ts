import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderComponent } from "./order/order.component";
import { OrdersTableComponent } from "./orders-table/orders-table.component";
import { OrdersService } from "./orders.service";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesModule } from "../../features/features.module";
import { OrdersComponent } from "./orders.component";
import { OrderTakingComponent } from "./order-taking/order-taking.component";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatBadgeModule } from "@angular/material/badge";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoadingModule } from "../../features/loading/loading.module";
import { OrdersRoutingModule } from "./orders-routing.module";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrdersTableComponent,
    OrderTakingComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HttpClientModule,
    FeaturesModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatGridListModule,
    MatProgressBarModule,
    LoadingModule,
  ],
  providers: [
    OrdersService,
  ],
  exports: [
    OrdersTableComponent,
    OrderTakingComponent,
  ],
})
export class OrdersModule {
}
