// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Führt den Login durch, schreibt den erhaltenen JWT in localStorage
   * und gibt ihn (als Observable) an den Aufrufer zurück.
   */
  login(username: string, password: string): Observable<string> {
    const body = { username, password };


    /* <------  KEIN tap – wir verpacken den Aufruf in ein eigenes Observable */
    return new Observable<string>(observer => {
      this.http.post(this.baseUrl + '/login', body, {
          responseType: 'text'        // ← Token kommt als Klartext (string)
      }).subscribe({
        next: token => {
          localStorage.setItem('token', token); // im Browser speichern
          observer.next(token);                 // an Komponenten weitergeben
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  private isTokenExpired(token: String): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now > expiry;
    } catch (e) {
      return true;
    }
  }

  /** Gibt den aktuell gespeicherten Token zurück (oder null). */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Gibt true zurück, wenn ein Token vorhanden ist */
  isLoggedIn(): boolean {
    console.log("Nutzer wird geprüft" + localStorage.getItem('token'));
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }


  /** Entfernt den Token wieder. */
  logout(): void {
    console.log("Is Logged out")
    localStorage.removeItem('token');
  }
}
