// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//wird im Frontend verwendet um abzufragen, ob der Nutzer eingeloggt ist
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
        console.log("ist Logged in");
      return true;
    }
    this.router.navigate(['/play-login']);
    console.log("is not logged in");
    return false;
  }
}
