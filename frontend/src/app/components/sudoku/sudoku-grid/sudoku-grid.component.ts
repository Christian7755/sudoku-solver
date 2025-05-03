import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
      
  }

  constructor() { }

  //access a certain cell
  setCell(row: number, col: number, value: number): void {
    this.grid[col][row] = value;
  }

  //Getting a certain cell
  getCell(row: number, col: number): number {
    return this.grid[col][row];
  }

  updateCell(event: { row: number, col: number, value: number}) {
    this.grid[event.col][event.row] = event.value;

    console.log("Sudoku-Grid: update cell col" + event.col + " and row " + event.row + " with value " + event.value );
  }
}
