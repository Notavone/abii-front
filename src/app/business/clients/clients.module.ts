import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ClientsComponent } from "./clients.component";
import { ClientComponent } from "./client/client.component";
import { ClientsService } from "./clients.service";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesModule } from "../../features/features.module";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientSearchComponent } from './client-search/client-search.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    ClientSearchComponent,
  ],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    FeaturesModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  providers: [
    ClientsService,
    MatSnackBar,
    CurrencyPipe,
  ],
})
export class ClientsModule {
}
