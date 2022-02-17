import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./products/product/product.component";
import {ClientsComponent} from "./clients/clients.component";
import {ClientComponent} from "./clients/client/client.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderComponent} from "./orders/order/order.component";

const routes: Routes = [
  {path: "orders/:id", component: OrderComponent},
  {path: "orders", component: OrdersComponent},

  {path: "clients/:id", component: ClientComponent},
  {path: "clients", component: ClientsComponent},

  {path: "products/:id", component: ProductComponent},
  {path: "products", component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
