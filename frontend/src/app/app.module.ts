import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { SudokuGridComponent } from './components/sudoku/sudoku-grid/sudoku-grid.component';
import { SudokuCellComponent } from './components/sudoku/sudoku-cell/sudoku-cell.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { PlayComponent } from './play/play.component';
import { PlayLoginComponent } from './play-login/play-login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
declarations: [
    AppComponent,
    SudokuGridComponent,
    SudokuCellComponent,
    PlayComponent,
    HomeComponent,
],
  imports: [
    BrowserModule,
    ButtonComponent,
    FormsModule,
    LoginComponent,
    LogoutComponent,
    PlayLoginComponent,
    AppRoutingModule,
    StatsComponent, 
    HttpClientModule
  ],
  exports: [SudokuGridComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent] 
})
export class AppModule { }

