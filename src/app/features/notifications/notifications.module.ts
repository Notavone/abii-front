import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NotificationsSettingsComponent } from "./notifications-settings.component";

@NgModule({
  declarations: [
    NotificationsSettingsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    NotificationsSettingsComponent,
  ],
})
export class NotificationsModule {
}
