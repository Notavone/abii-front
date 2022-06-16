import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';
import { TestingComponent } from './testing.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    TestingComponent
  ],
  imports: [
    CommonModule,
    TestingRoutingModule,
    ZXingScannerModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class TestingModule { }
