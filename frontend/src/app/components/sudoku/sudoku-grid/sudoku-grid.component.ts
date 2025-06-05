import { Component, OnInit } from '@angular/core';
import { SudokuApiService, SudokuResponse } from '../../../services/sudoku-api.service';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.css',
  standalone: false
})

export class SudokuGridComponent implements OnInit {
  
  
  grid: { value: number; changeable: boolean}[][] = [];

  message = '';

  ngOnInit(): void {
    this.grid = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({ value: 0, changeable: true }))
    );
  }

  constructor(private api: SudokuApiService) { }

  solve(): void {
    this.api.solve(this.getNumberGrid()).subscribe({
      next: res => {
        this.setGridFromResponse(res);
        this.message = res.message;
      },
      error: err => this.message = 'Fehler: ' + err.message
    })
  }

  generate(): void {
    this.api.generate().subscribe({
      next: res => {
        this.setGridFromResponse(res);
        this.message = res.message;
      },
      error: err => this.message = 'Fehler: ' + err.message
    })
  }

  /** Export-Handler */
  export(): void {
    this.api.exportCsv(this.getNumberGrid()).subscribe({
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
          console.log("Das Grid wird gesetzt");
          this.setGridFromResponse(res);
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

  //Setter für die einzelne Zelle
  setCell(row: number, col: number, value: number): void {
    this.grid[row][col].value = value;
  }

  //Getter für die einzelne Zelle
  getCell(row: number, col: number): number {
    return this.grid[row][col].value;
  }

  //um den Wert der einzelnen Zelle upzudaten
  updateCell(event: { row: number, col: number, value: number}) {
    this.grid[event.row][event.col].value = event.value;

    console.log("Sudoku-Grid: update cell col" + event.col + " and row " + event.row + " with value " + event.value );
  }

  trackByIndex(index: number): number {return index; }

  //Hilfsmethode, um das Grid von der Response zu setzen
  private setGridFromResponse(res: SudokuResponse): void {

    //Fallback, falls in der Response die Angaben zu changeable fehlen
    const fallbackChangable = res.grid.map(row => row.map(() => true));
    const changeableGrid = res.changeable ?? fallbackChangable;

    this.grid = res.grid.map((row, i) =>
      row.map((value, j) => ({
        value,
        changeable: changeableGrid[i][j]
      }))
  );
  }

  //Hilfsmethode um bei dem Methodenaufruf nur die Werte ohne die Wahrheitswerte zu verwenden
  private getNumberGrid(): number[][] {
    return this.grid.map(row => row.map(cell => cell.value));
  }

}
