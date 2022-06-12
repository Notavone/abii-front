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
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { OrdersRoutingModule } from "./orders-routing.module";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
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
  ],
  providers: [
    OrdersService,
  ],
})
export class OrdersModule {
}
