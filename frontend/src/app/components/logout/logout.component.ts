import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private auth: AuthService) {}
  
  logout(): void {
    console.log("Dies ist ein Test");
    this.auth.logout();
  }
}
