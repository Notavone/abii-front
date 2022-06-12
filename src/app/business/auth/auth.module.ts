import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ], providers: [
    AuthService,
    AuthInterceptor,
  ],
})
export class AuthModule {
}
