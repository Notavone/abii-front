import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {UsersComponent} from './users.component';
import {UserComponent} from './user/user.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {OrdersModule} from "../orders/orders.module";
import { UserTableComponent } from './user-table/user-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatBadgeModule} from "@angular/material/badge";
import {LoadingModule} from "../features/loading/loading.module";


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserTableComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        OrdersModule,
        MatTableModule,
        MatSortModule,
        MatBadgeModule,
        LoadingModule,
    ],
})
export class UsersModule {
}
