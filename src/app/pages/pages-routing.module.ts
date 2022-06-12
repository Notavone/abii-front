import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "404", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
