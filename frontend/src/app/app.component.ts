import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',  // Der Selector, der in der index.html verwendet wird
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'my-angular-app';  

  constructor(private authService: AuthService, public router: Router) {}
  
}



