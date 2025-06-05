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

  focusedRow: number | null = null;
  focusedCol: number | null = null;
  message = '';

  //Validation for User Input
  validationMessage = '';
  validationTimout: any;

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
    this.clearValidationMessage();

    //Der User-Input wird validiert um sicherzustellen, dass er mit den Sudoku-Regeln Kopatibel ist
    if (this.isMoveInvalid(event.row, event.col, event.value)) {
      return;
    }

    this.grid[event.row][event.col].value = event.value;
    console.log("Sudoku-Grid: update cell col" + event.col + " and row " + event.row + " with value " + event.value );
  }

  onFocus(row: number, col: number): void {
    this.focusedRow = row;
    this.focusedCol = col;
  }

  moveFocus(event: { rowOffset: number, colOffset: number }): void {
    if (this.focusedRow === null || this.focusedCol === null) return;
    const newRow = (this.focusedRow + event.rowOffset + 9) % 9;
    const newCol = (this.focusedCol + event.colOffset + 9) % 9;
    this.focusToCell(newRow, newCol);
  }

  private focusToCell(row: number, col: number): void {
    setTimeout(() => {
      const selector = `.row-${row}.col-${col} input`;
      const input = document.querySelector<HTMLInputElement>(selector);
      input?.focus();
    });
  }


  trackByIndex(index: number): number {return index; }

  private showValidationMessage(message: string): void {
    this.validationMessage = message;

    clearTimeout(this.validationTimout);
    this.validationTimout = setTimeout(() => {
      this.validationMessage = '';
    }, 3000);
  }

  private clearValidationMessage(): void {
    this.validationMessage = '';
    clearTimeout(this.validationTimout);
  }



  //Hilfsmethode: Überprüfung der Sudoku-Regeln:
  private isMoveInvalid(row: number, col: number, value: number): boolean {
    if (value === 0) return false;

    // Zeile prüfen
    if (this.grid[row].some((cell, i) => i !== col && cell.value === value)) {
      this.showValidationMessage(`Zahl ${value} ist bereits in der Zeile.`);
      return true;
    }

    // Spalte prüfen
    if (this.grid.some((r, i) => i !== row && r[col].value === value)) {
      this.showValidationMessage(`Zahl ${value} ist bereits in der Spalte.`);
      return true;
    }

    // Kasten prüfen
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let i = boxRowStart; i < boxRowStart + 3; i++) {
      for (let j = boxColStart; j < boxColStart + 3; j++) {
        if ((i !== row || j !== col) && this.grid[i][j].value === value) {
          this.showValidationMessage(`Zahl ${value} ist bereits im 3x3-Kasten.`);
          return true;
        }
      }
    }

    return false;
    }


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
