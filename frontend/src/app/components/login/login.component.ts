// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {

  username = '';
  password = '';
  message  = '';

  constructor(private auth: AuthService) {}

  login(): void {
    this.auth.login(this.username, this.password).subscribe({
      next: ()   => this.message = '✅ eingeloggt',
      error: err => this.message = '❌ ' + err.error
    });
  }
}
