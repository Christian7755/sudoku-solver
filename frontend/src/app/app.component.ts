import { Component, ViewChild, ElementRef } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { SudokuGridComponent } from './components/sudoku/sudoku-grid/sudoku-grid.component';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',  // Der Selector, der in der index.html verwendet wird
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'my-angular-app';  // Beispiel-Property, die im Template verwendet werden kann

  @ViewChild(SudokuGridComponent) gridComp!: SudokuGridComponent;

  constructor(private authService: AuthService) {}


  

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



