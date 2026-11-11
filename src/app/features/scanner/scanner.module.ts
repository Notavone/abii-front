import { NgModule } from "@angular/core";
import { ScannerComponent } from "./scanner.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    ScannerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ScannerComponent,
  ],
})
export class ScannerModule {
}
