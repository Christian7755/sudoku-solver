import { Component, OnInit } from '@angular/core';
import { SudokuApiService, SudokuResponse } from '../../../services/sudoku-api.service';

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

  /** Export-Handler */
  export(): void {
    this.api.exportCsv(this.grid).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sudoku.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: err => this.message = 'Fehler beim Export: ' + err.message
    });
  }

  /** Wird von der AppComponent aufgerufen */
  public importCsvFile(file: File): void {
    this.api.importCsv(file).subscribe({
      next: (res: SudokuResponse) => {
        if (res.solvable) {
          this.grid = res.grid;
          this.message = res.message;
        } else {
          this.message = 'Import fehlgeschlagen: ' + res.message;
        }
      },
      error: err => {
        this.message = 'Fehler beim Import: ' + (err.error?.message || err.message);
      }
    });
  }

  //access a certain cell
  setCell(row: number, col: number, value: number): void {
    this.grid[row][col] = value;
  }

  //Getting a certain cell
  getCell(row: number, col: number): number {
    return this.grid[row][col];
  }

  //um den Wert der einzelnen Zelle upzudaten
  updateCell(event: { row: number, col: number, value: number}) {
    this.grid[event.row][event.col] = event.value;

    console.log("Sudoku-Grid: update cell col" + event.col + " and row " + event.row + " with value " + event.value );
  }

  trackByIndex(index: number): number {return index; }
}
