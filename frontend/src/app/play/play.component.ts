import { Component } from '@angular/core';
import { SudokuGridComponent } from '../components/sudoku/sudoku-grid/sudoku-grid.component';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-play',
  imports: [AppModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {

}
