import { NgModule } from "@angular/core";
import { ScannerComponent } from "./scanner.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ZXingScannerModule } from "@zxing/ngx-scanner";

@NgModule({
  declarations: [
    ScannerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ZXingScannerModule,
  ],
  exports: [
    ScannerComponent,
  ],
})
export class ScannerModule {
}
