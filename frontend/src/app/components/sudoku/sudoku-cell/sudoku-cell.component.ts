import { Component, Input, Output, EventEmitter, output } from '@angular/core';

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
  @Input() changeable: boolean = true;


  @Output() cellUpdated = new EventEmitter<{row: number, col: number, value: number}>();
  @Output() moveFocus = new EventEmitter<{ rowOffset: number, colOffset: number }>();
  @Output() focus = new EventEmitter<void>();


  onKeyDown(event: KeyboardEvent): void {
    
    //Logik, um Bewegungen zwischen den Zellen mit dem Keyboard zu ermöglichen
    const movement: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1]
    };

    if (event.key in movement) {
      const [rowOffset, colOffset] = movement[event.key];
      event.preventDefault(); // verhindert Scrollen
      this.moveFocus.emit({ rowOffset, colOffset });
      return;
    }

    // Wenn es eine Ziffer von 1 bis 9 ist → direkt ersetzen
    if (/^[1-9]$/.test(event.key) && this.changeable) {
      event.preventDefault(); // verhindert, dass die Zahl angehängt wird
      const newValue = parseInt(event.key, 10);
      this.cellUpdated.emit({ row: this.row, col: this.col, value: newValue });

      // Direkt wieder Fokussieren, damit Tastatureingaben weiter funktionieren
      setTimeout(() => {
        const input = (event.target as HTMLInputElement);
        input.select();
      });
    }

    
    // Bei "0" oder "Backspace" → löschen
    if ((event.key === '0' || event.key === 'Backspace') && this.changeable) {
      event.preventDefault();
      this.cellUpdated.emit({ row: this.row, col: this.col, value: 0 });
    }
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const parsed = parseInt(input, 10);
    const value = !isNaN(parsed) && parsed >= 1 && parsed <= 9 ? parsed : 0;
    this.cellUpdated.emit({ row: this.row, col: this.col, value });
  }

  onFocus(): void {
    this.focus.emit();
  }


  //wird aufgerufen, wenn der Wert der Zelle geändert wird.
  onCellChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const parsed = parseInt(input, 10);
    const value = isNaN(parsed) ? 0 : parsed;
    this.cellUpdated.emit({ row: this.row, col: this.col, value });
  }

  //Umgang mit der Tastatureingabe
  onKeyPress(event: KeyboardEvent): void {
    const allowedKeys = ['1','2','3','4','5','6','7','8','9'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault(); // blockiert alle anderen Zeichen
    }
  }


}
