import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.url.startsWith('/api')
      ? req.clone({ url: `${environment.apiUrl}${req.url}`, withCredentials: true })
      : req.clone({ withCredentials: true });

    return next.handle(apiReq);
  }
}