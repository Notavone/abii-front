import { DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import localeFr from "@angular/common/locales/fr";
import { CommonModule, registerLocaleData } from "@angular/common";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthInterceptor } from "./business/auth/auth.interceptor";
import { environment } from "../environments/environment";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthModule } from "./business/auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FeaturesModule } from "./features/features.module";
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";

registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FeaturesModule,
    CommonModule,
    AuthModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: true,
      registrationStrategy: "registerWhenStable:30000",
    }),
    ServiceWorkerModule.register("firebase-messaging-sw.js", {
      enabled: true,
      registrationStrategy: "registerWhenStable:30000",
    }),
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "standard" } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 1000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
