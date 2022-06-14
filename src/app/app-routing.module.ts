import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./business/auth/auth.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AbiiGuard } from "./business/auth/abii.guard";

const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule) },

  { path: "products", loadChildren: () => import("./business/products/products.module").then(m => m.ProductsModule), canActivate: [AuthGuard, AbiiGuard] },
  { path: "stock", loadChildren: () => import("./business/stock/stock.module").then(m => m.StockModule), canActivate: [AuthGuard, AbiiGuard] },
  { path: "orders", loadChildren: () => import("./business/orders/orders.module").then(m => m.OrdersModule), canActivate: [AuthGuard] },
  { path: "clients", loadChildren: () => import("./business/clients/clients.module").then(m => m.ClientsModule), canActivate: [AuthGuard] },
  { path: "users", loadChildren: () => import("./business/users/users.module").then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: "testing", loadChildren: () => import("./testing/testing.module").then(m => m.TestingModule), canActivate: [AuthGuard, AbiiGuard] },

  { path: "**", pathMatch: "full", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
