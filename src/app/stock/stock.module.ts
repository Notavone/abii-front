import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import {LoadingModule} from "../features/loading/loading.module";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    StockComponent
  ],
    imports: [
        CommonModule,
        StockRoutingModule,
        LoadingModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatIconModule
    ]
})
export class StockModule { }
