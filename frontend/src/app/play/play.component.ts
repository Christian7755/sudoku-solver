import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { SudokuGridComponent } from '../components/sudoku/sudoku-grid/sudoku-grid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  standalone: false
})
export class PlayComponent {
  
  constructor(private authService: AuthService, private http: HttpClient, public router: Router){}
  
   @ViewChild(SudokuGridComponent) gridComp!: SudokuGridComponent;
  gameId!: number;

  ngAfterViewInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.gridComp.generate();
    const username = this.authService.getUsername();
    this.http.post<number>('http://localhost:8080/api/stats/start', username, {
      headers: { 'Content-Type': 'application/json'}
    }).subscribe(id =>this.gameId = id);
  }

  endGame(success: boolean): void {
    if (!this.gameId) return;
     this.http.post(`http://localhost:8080/api/stats/end/${this.gameId}`, success, {
    headers: { 'Content-Type': 'application/json' }
  }).subscribe();
  this.router.navigate(['']);
  }
}
