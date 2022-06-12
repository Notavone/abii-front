import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MatCardModule } from "@angular/material/card";
import { LoadingModule } from "../features/loading/loading.module";
import { ProductsModule } from "../business/products/products.module";


@NgModule({
  declarations: [
    HomepageComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    LoadingModule,
    ProductsModule,
  ],
})
export class PagesModule {
}
