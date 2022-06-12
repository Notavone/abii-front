import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {FeaturesModule} from "../../features/features.module";
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetComponent } from './reset/reset.component';
import { LoadingModule } from "../../features/loading/loading.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    FeaturesModule,
    LoadingModule,
  ], providers: [
    AuthService,
    AuthInterceptor
  ],
})
export class AuthModule {
}
