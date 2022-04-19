import {DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import localeFr from "@angular/common/locales/fr";
import {CommonModule, registerLocaleData} from "@angular/common";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {environment} from "../environments/environment";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthModule} from "./auth/auth.module";
import {ClientsModule} from "./clients/clients.module";
import {ProductsModule} from "./products/products.module";
import {OrdersModule} from "./orders/orders.module";
import {DialogModule} from "./dialog/dialog.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HomepageComponent} from "./homepage/homepage.component";
import {OverviewModule} from "./overview/overview.module";

registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    RouterModule,
    ProductsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    AuthModule,
    ClientsModule,
    ProductsModule,
    OrdersModule,
    DialogModule,
    OverviewModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: "fr-FR"},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
