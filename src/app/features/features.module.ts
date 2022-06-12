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
import { OrdersTableComponent } from "./orders-table/orders-table.component";
import { ProductTableComponent } from "./product-table/product-table.component";
import { OrderTakingComponent } from "./order-taking/order-taking.component";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatBadgeModule } from "@angular/material/badge";
import { RouterModule } from "@angular/router";
import { MatNativeDateModule } from "@angular/material/core";


@NgModule({
  declarations: [
    ConfirmComponent,
    FileUploadComponent,
    LoadingComponent,
    OrdersTableComponent,
    ProductTableComponent,
    OrderTakingComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    MatBadgeModule,
    RouterModule,
    MatNativeDateModule,
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
    OrdersTableComponent,
    ProductTableComponent,
    OrderTakingComponent,
  ],
})
export class FeaturesModule {
}
