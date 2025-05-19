import { Component, OnInit } from '@angular/core';
import { SudokuApiService } from '../../../services/sudoku-api.service';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.css',
  standalone: false
})

export class SudokuGridComponent implements OnInit {
  
  grid: number[][] = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];

  message = '';

  ngOnInit(): void {
      
  }

  constructor(private api: SudokuApiService) { }

  solve(): void {
    this.api.solve(this.grid).subscribe({
      next: res => {
        this.grid = res.grid;
        this.message = res.message;
      },
      error: err => this.message = 'Fehler: ' + err.message
    })
  }

  generate(): void {
    this.api.generate().subscribe({
      next: res => {
        this.grid = res.grid;
        this.message = res.message;
      },
      error: err => this.message = 'Fehler: ' + err.message
    })
  }

  //access a certain cell
  setCell(row: number, col: number, value: number): void {
    this.grid[row][col] = value;
  }

  //Getting a certain cell
  getCell(row: number, col: number): number {
    return this.grid[row][col];
  }

  updateCell(event: { row: number, col: number, value: number}) {
    this.grid[event.row][event.col] = event.value;

    console.log("Sudoku-Grid: update cell col" + event.col + " and row " + event.row + " with value " + event.value );
  }

  trackByIndex(index: number): number {return index; }
}
