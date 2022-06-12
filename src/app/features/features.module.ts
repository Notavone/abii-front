import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { LoggingService } from "./logging.service";
import { QueryService } from "./query.service";
import { ConfirmComponent } from "./confirm/confirm.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { LoadingComponent } from "./loading/loading.component";
import { ConfirmService } from "./confirm/confirm.service";
import { FileUploadService } from "./file-upload/file-upload.service";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ConfirmComponent,
    FileUploadComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    DatePipe,
    LoggingService,
    QueryService,
    ConfirmService,
    FileUploadService,
  ],
  exports: [
    ConfirmComponent,
    LoadingComponent,
    FileUploadComponent,
  ],
})
export class FeaturesModule {
}
