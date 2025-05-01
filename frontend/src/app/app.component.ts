import { Component } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',  // Der Selector, der in der index.html verwendet wird
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'my-angular-app';  // Beispiel-Property, die im Template verwendet werden kann
}



