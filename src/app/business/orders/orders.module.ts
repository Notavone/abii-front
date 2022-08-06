import { NgModule } from "@angular/core";
import { OrderComponent } from "./order/order.component";
import { OrdersService } from "./orders.service";
import { OrdersComponent } from "./orders.component";
import { FeaturesModule } from "../../features/features.module";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { OrdersRoutingModule } from "./orders-routing.module";
import { MatTabsModule } from "@angular/material/tabs";
import { OrderCashierComponent } from "./order-cashier/order-cashier.component";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatProgressBarModule } from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrderCashierComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FeaturesModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatRippleModule,
    MatBadgeModule,
    MatProgressBarModule,
  ],
  providers: [
    OrdersService,
    CurrencyPipe,
  ],
})
export class OrdersModule {
}
