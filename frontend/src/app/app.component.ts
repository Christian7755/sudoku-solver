import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { SudokuGridComponent } from './components/sudoku/sudoku-grid/sudoku-grid.component';

@Component({
  selector: 'app-root',  // Der Selector, der in der index.html verwendet wird
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'my-angular-app';  // Beispiel-Property, die im Template verwendet werden kann

  @ViewChild(SudokuGridComponent) gridComp!: SudokuGridComponent;

  callSolve(): void{
    this.gridComp.solve();
  }
}



