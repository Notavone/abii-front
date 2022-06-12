import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientsComponent } from "./clients.component";
import { ClientComponent } from "./client/client.component";
import { AbiiGuard } from "../auth/abii.guard";

const routes: Routes = [
  { path: "", component: ClientsComponent, canActivate: [AbiiGuard] },
  { path: ":id", component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {
}
