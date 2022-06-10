import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ProductComponent } from "./products/product/product.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./orders/order/order.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "./auth/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ConfirmComponent } from "./auth/confirm/confirm.component";
import { AbiiGuard } from "./auth/abii.guard";
import { ResetComponent } from "./auth/reset/reset.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "confirm", component: ConfirmComponent },
  { path: "reset", component: ResetComponent },

  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard, AbiiGuard] },
  { path: "orders/:id", component: OrderComponent, canActivate: [AuthGuard] },

  { path: "products", component: ProductsComponent, canActivate: [AuthGuard, AbiiGuard] },
  { path: "products/:id", component: ProductComponent, canActivate: [AuthGuard, AbiiGuard] },

  { path: "404", component: NotFoundComponent },

  { path: "stock", loadChildren: () => import("./stock/stock.module").then(m => m.StockModule) },
  { path: "clients", loadChildren: () => import("./clients/clients.module").then(m => m.ClientsModule), canActivate: [AuthGuard] },
  { path: "users", loadChildren: () => import("./users/users.module").then(m => m.UsersModule), canActivate: [AuthGuard] },

  { path: "**", pathMatch: "full", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
