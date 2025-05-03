import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrl: './sudoku-cell.component.css',
  standalone: false
})
export class SudokuCellComponent {
  @Input() row!: number;
  @Input() col!: number;
  @Input() value!: number;
  @Output() cellUpdated = new EventEmitter<{row: number, col: number, value: number}>();

//wird aufgerufen, wenn der Wert der Zelle geändert wird.
onCellChange(value: number): void {
  //Sendet den Wert an das SudokuGridComponent
  this.cellUpdated.emit({row: this.row, col: this.col, value});
}

}
