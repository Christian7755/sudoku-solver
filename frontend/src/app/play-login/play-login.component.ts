import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-play-login',
  imports: [ LoginComponent],
  templateUrl: './play-login.component.html',
  styleUrl: './play-login.component.css'
})

//einfache Login Komponente auf extra Seite. Wird dem Play-Mode vorgezogen, wenn der Nutzer nicht eingeloggt ist.
export class PlayLoginComponent {

}
