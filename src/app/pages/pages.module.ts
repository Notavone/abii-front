import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MatCardModule } from "@angular/material/card";
import { LoadingModule } from "../features/loading/loading.module";
import { ProductsModule } from "../business/products/products.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ResetComponent } from "./reset/reset.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    HomepageComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    LoadingModule,
    ProductsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class PagesModule {
}
