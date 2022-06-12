import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AbiiGuard } from "../auth/abii.guard";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
  { path: "", component: UsersComponent, canActivate: [AbiiGuard] },
  { path: ":id", component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
