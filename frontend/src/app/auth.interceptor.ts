// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
    console.log("Interceptor activated");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Logging for Debugging
    console.log("Getting Token: "+ localStorage.getItem('token'));
    const token = this.auth.getToken();
    console.log("Token:"+  token)
    const username = this.auth.getUsername();

    // Diese Pfade sollen ohne Token laufen:
    const isPublicRequest =
      req.url.endsWith('/generate') || req.url.endsWith('/solve') || req.url.includes('/login');

    if (!isPublicRequest && token && token !== 'null' && token !== 'undefined'){
      console.log("Interceptor fügt Header hinzu")
      let headers = req.headers.set('Authorization', `Bearer ${token}`);

      //falls der Username vorhanden ist wird er mitgesendet
      if (username) {
        headers = headers.set('X-Username', username);
      }

      req = req.clone( { headers });
    }
    return next.handle(req);
  }

}
