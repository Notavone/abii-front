import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsComponent} from "./clients.component";
import {ClientComponent} from "./client/client.component";
import {ClientCreateFormComponent} from "./client-create-form/client-create-form.component";
import {ClientsService} from "./clients.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ClientBalanceFormComponent} from "./client/client-balance-form/client-balance-form.component";
import {ClientBuyFormComponent} from "./client/client-buy-form/client-buy-form.component";
import {ClientHistoryComponent} from "./client/client-history/client-history.component";
import {ClientParamsComponent} from "./client/client-params/client-params.component";
import {ClientStatusFormComponent} from "./client/client-status-form/client-status-form.component";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {OrdersModule} from "../orders/orders.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {FeaturesModule} from "../features/features.module";
import {MatSnackBar} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    ClientCreateFormComponent,
    ClientBalanceFormComponent,
    ClientBuyFormComponent,
    ClientHistoryComponent,
    ClientParamsComponent,
    ClientStatusFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    OrdersModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    FeaturesModule,
    MatPaginatorModule,
  ],
  providers: [
    ClientsService,
    MatSnackBar
  ]
})
export class ClientsModule { }
