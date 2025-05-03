import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { SudokuGridComponent } from './components/sudoku/sudoku-grid/sudoku-grid.component';
import { SudokuCellComponent } from './components/sudoku/sudoku-cell/sudoku-cell.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
declarations: [
    AppComponent,
    SudokuGridComponent,
    SudokuCellComponent,
],
  imports: [
    BrowserModule,
    ButtonComponent,
    FormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent] 
})
export class AppModule { }

