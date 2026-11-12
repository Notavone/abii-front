import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";


@NgModule({ declarations: [], imports: [CommonModule], providers: [
        AuthService,
        AuthInterceptor,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AuthModule {
}
