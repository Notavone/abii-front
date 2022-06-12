import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ResetComponent } from "./reset/reset.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "404", component: NotFoundComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "confirm", component: ConfirmComponent },
  { path: "reset", component: ResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
