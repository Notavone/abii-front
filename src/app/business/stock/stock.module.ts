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
import { ScannerModule } from "../../features/scanner/scanner.module";
import { StockModalComponent } from './stock-modal/stock-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";


@NgModule({
  declarations: [
    StockComponent,
    StockModalComponent
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
    ScannerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class StockModule { }
