import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AbiiGuard } from "../auth/abii.guard";
import { OrdersComponent } from "./orders.component";
import { OrderComponent } from "./order/order.component";

const routes: Routes = [
  { path: "", component: OrdersComponent, canActivate: [AbiiGuard] },
  { path: ":id", component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
}
