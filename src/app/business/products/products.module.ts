import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products.component";
import { ProductsService } from "./products.service";
import { ProductsRoutingModule } from "./products-routing.module";
import { FeaturesModule } from "../../features/features.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FeaturesModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  providers: [
    ProductsService,
  ],
})
export class ProductsModule {
}
