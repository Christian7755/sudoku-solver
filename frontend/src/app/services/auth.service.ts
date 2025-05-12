import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token'; // Hier speichern wir den Token im LocalStorage

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const url = `http://localhost:8080/api/auth/login?username=${username}&password=${password}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
