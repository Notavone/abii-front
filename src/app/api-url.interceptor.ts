import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. On récupère l'URL du backend définie dynamiquement via Docker (ou localhost par défaut)
    const backendUrl = (window as any).__env?.backendUrl || 'http://localhost:3000';

    // 2. Si la requête est relative et commence par /api, on injecte l'URL du backend
    if (req.url.startsWith('/api')) {
      const apiReq = req.clone({
        url: `${backendUrl}${req.url}`
      });
      return next.handle(apiReq);
    }

    // Sinon, on laisse passer la requête telle quelle (ex: chargement d'assets locaux)
    return next.handle(req);
  }
}