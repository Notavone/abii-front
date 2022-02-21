import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./products/product/product.component";
import {ClientsComponent} from "./clients/clients.component";
import {ClientComponent} from "./clients/client/client.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderComponent} from "./orders/order/order.component";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component"
import {HomepageComponent} from "./homepage/homepage.component";
import {ClientBuyFormComponent} from "./clients/client/client-buy-form/client-buy-form.component";
import {ClientHistoryComponent} from "./clients/client/client-history/client-history.component";
import {ClientParamsComponent} from "./clients/client/client-params/client-params.component";
import {ProductParamsComponent} from "./products/product/product-params/product-params.component";
import {ProductHistoryComponent} from './products/product/product-history/product-history.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "login", component: AuthLoginComponent},

  {path: "orders/:id", component: OrderComponent},
  {path: "orders", component: OrdersComponent},

  {
    path: "clients/:id", component: ClientComponent, children: [
      {path: 'params', component: ClientParamsComponent},
      {path: 'buy', component: ClientBuyFormComponent},
      {path: 'history', component: ClientHistoryComponent}
    ]
  },
  {path: "clients", component: ClientsComponent},

  {
    path: "products/:id", component: ProductComponent, children: [
      {path: "params", component: ProductParamsComponent},
      {path: "history", component: ProductHistoryComponent}
    ]
  },
  {path: "products", component: ProductsComponent},

  {path: "overview", component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
