import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {ProductsComponent} from './products/products.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {ProductTableComponent} from './products/product-table/product-table.component';
import {MatTableModule} from "@angular/material/table";
import {ProductComponent} from './products/product/product.component';
import {MatCardModule} from "@angular/material/card";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ProductCreateFormComponent} from './products/product-create-form/product-create-form.component';
import {MatSelectModule} from "@angular/material/select";
import {ClientsComponent} from './clients/clients.component';
import {ClientCreateFormComponent} from './clients/client-create-form/client-create-form.component';
import {ClientComponent} from './clients/client/client.component';
import {ClientBalanceFormComponent} from './clients/client/client-balance-form/client-balance-form.component';
import {ClientBuyFormComponent} from './clients/client/client-buy-form/client-buy-form.component';
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {OrdersComponent} from './orders/orders.component';
import {OrdersTableComponent} from './orders/orders-table/orders-table.component';
import {OrderComponent} from './orders/order/order.component';
import {ClientCastComponent} from './clients/client-cast/client-cast.component';
import {ProductCastComponent} from './products/product-cast/product-cast.component';
import localeFr from "@angular/common/locales/fr";
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import {ClientStatusFormComponent} from './clients/client/client-status-form/client-status-form.component';
import {DialogConfirmComponent} from './dialog-confirm/dialog-confirm.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthService} from "./auth/shared/auth.service";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component";
import {HomepageComponent} from './homepage/homepage.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ClientHistoryComponent} from './clients/client/client-history/client-history.component';
import {ClientParamsComponent} from './clients/client/client-params/client-params.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from "@angular/material/snack-bar";
import {ProductParamsComponent} from './products/product/product-params/product-params.component';
import {ProductHistoryComponent} from './products/product/product-history/product-history.component';
import {AuthInterceptor} from "./auth/shared/auth.interceptor";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductTableComponent,
    ProductComponent,
    ProductCreateFormComponent,
    ClientsComponent,
    ClientCreateFormComponent,
    ClientComponent,
    ClientBalanceFormComponent,
    ClientBuyFormComponent,
    OrdersComponent,
    OrdersTableComponent,
    OrderComponent,
    ClientCastComponent,
    ProductCastComponent,
    ClientStatusFormComponent,
    DialogConfirmComponent,
    AuthLoginComponent,
    HomepageComponent,
    ClientHistoryComponent,
    ClientParamsComponent,
    ProductParamsComponent,
    ProductHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService,
    CurrencyPipe,
    MatSnackBar,
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
