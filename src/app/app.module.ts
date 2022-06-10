import {DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import localeFr from "@angular/common/locales/fr";
import {CommonModule, registerLocaleData} from "@angular/common";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {environment} from "../environments/environment";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthModule} from "./auth/auth.module";
import {ProductsModule} from "./products/products.module";
import {OrdersModule} from "./orders/orders.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HomepageComponent} from "./homepage/homepage.component";
import {ConfirmModule} from "./features/confirm/confirm.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {LoadingModule} from "./features/loading/loading.module";
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule,
    ProductsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    ConfirmModule,
    MatToolbarModule,
    CommonModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    LoadingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: "fr-FR"},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
