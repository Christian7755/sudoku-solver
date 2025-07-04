import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true
})
export class ButtonComponent {

  //Test des Buttons als Input-Feld 
  @Input() text: string = '';
}
