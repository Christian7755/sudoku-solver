import { Component, ViewChild, ElementRef } from '@angular/core';
import { SudokuGridComponent } from '../components/sudoku/sudoku-grid/sudoku-grid.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  title = 'sudoku-solver';

  constructor(private authService: AuthService, public router: Router) {}

  @ViewChild(SudokuGridComponent) gridComp!: SudokuGridComponent;

  //Aufrufe der Komponentenmethode zum Lösen des Sudokus
  callSolve(): void{
    this.gridComp.solve();
  }

  callGenerate(): void{
    this.gridComp.generate();
  }

  callExport(): void {
    this.gridComp.export();
  }


  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  /** Öffnet den Datei-Dialog */
  openFileDialog(): void {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  /** Ruft auf, wenn der Nutzer eine Datei auswählt */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.gridComp.importCsvFile(file);
  }
}
