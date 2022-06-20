import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { FeaturesModule } from "../../features/features.module";
import { MatTabsModule } from "@angular/material/tabs";
import { EanModule } from "../ean/ean.module";


@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    FeaturesModule,
    MatTabsModule,
    EanModule,
  ],
})
export class StockModule { }
