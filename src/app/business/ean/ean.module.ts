import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EanRoutingModule } from './ean-routing.module';
import { EanComponent } from './ean.component';
import { MatCardModule } from "@angular/material/card";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FeaturesModule } from "../../features/features.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EanCardComponent } from './ean-card/ean-card.component';
import { EanEditModalComponent } from './ean-edit-modal/ean-edit-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ScannerModule } from "../../features/scanner/scanner.module";


@NgModule({
  declarations: [
    EanComponent,
    EanCardComponent,
    EanEditModalComponent,
  ],
  imports: [
    CommonModule,
    EanRoutingModule,
    MatCardModule,
    DragDropModule,
    FeaturesModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule,
    ScannerModule,
  ],
  exports: [
    EanComponent,
  ],
})
export class EanModule { }
