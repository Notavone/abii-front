import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products.component";
import {ProductTableComponent} from "./product-table/product-table.component";
import {ProductsService} from "./products.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {HttpClientModule} from "@angular/common/http";
import {FeaturesModule} from "../../features/features.module";
import {OrdersModule} from "../orders/orders.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatBadgeModule} from "@angular/material/badge";
import {FileUploadModule} from "../../features/file-upload/file-upload.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoadingModule} from "../../features/loading/loading.module";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductTableComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        HttpClientModule,
        FeaturesModule,
        MatTabsModule,
        MatExpansionModule,
        OrdersModule,
        MatCheckboxModule,
        MatBadgeModule,
        FileUploadModule,
        MatTooltipModule,
        LoadingModule
    ],
  providers: [
    ProductsService
  ],
  exports: [
    ProductTableComponent,
  ]
})
export class ProductsModule {
}
