// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    console.log('Token', token)

    // Diese Pfade sollen ohne Token laufen:
    const isPublicRequest =
      req.url.endsWith('/generate') || req.url.endsWith('/solve') || req.url.includes('/login');

    if (token && token !== 'null' && token !== 'undefined' && !isPublicRequest) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }

}
