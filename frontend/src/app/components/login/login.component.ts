// src/app/components/login/login.component.ts
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {

  @Input() redirectAfterLogin: boolean= false;
  @Input() redirectTo: string = '/play'

  username = '';
  password = '';
  message  = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.message = '✅ eingeloggt';
        if (this.redirectAfterLogin) {
          this.router.navigate([this.redirectTo]);
        }
      },
      error: err => {
        this.message = '❌ ' + err.error;
      }
    });
  }
}
