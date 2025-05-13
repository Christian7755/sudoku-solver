import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { SudokuGridComponent } from './components/sudoku/sudoku-grid/sudoku-grid.component';
import { SudokuCellComponent } from './components/sudoku/sudoku-cell/sudoku-cell.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';

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
    LoginComponent
  ],
  providers: [provideHttpClient() ,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent] 
})
export class AppModule { }

