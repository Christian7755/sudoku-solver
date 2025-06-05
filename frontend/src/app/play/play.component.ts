import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { SudokuGridComponent } from '../components/sudoku/sudoku-grid/sudoku-grid.component';
import { Router } from '@angular/router';
import { SudokuRequest } from '../services/sudoku-api.service';
import { ClockComponent } from '../components/clock/clock.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  standalone: false
})
export class PlayComponent {
  gameEnded: boolean = false;
  gameSuccessful: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient, public router: Router){}
  
  @ViewChild('clock') clockComp!: ClockComponent;
  pauseOverlay: boolean = false;

  togglePause(): void {
    this.pauseOverlay = !this.pauseOverlay;
    this.clockComp.pause();
  }

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


  //Wenn der Nutzer einzelne Werte im Sudoku eingibt, soll geprüft werden, ob er dies erfolgreich gelöst hat
  onCellChanged(grid: {value: number; changeable: boolean}[][]): void {
    //for Debugging
    console.log("Cell Changed: check in Play COmponent");
    const isComplete = grid.every(row => row.every(cell => cell.value !== 0));
    if(!isComplete) return;

    const numberGrid: number [][] = grid.map(row => row.map(cell => cell.value));
    const changeableGrid: boolean[][] = grid.map(row => row.map(cell => cell.changeable));

    const request: SudokuRequest = {
      grid: numberGrid,
      changeable: changeableGrid
    }

    this.http.post<SudokuRequest>('http://localhost:8080/api/sudoku/validate', request, {
      headers: { 'Content-Type': 'application/json'}
    }).subscribe({
      next: isSolved => {
        if (isSolved){
          this.gameSuccessful = true;
          this.endGame(true);
        }
      }
    })
  }

  //Für das Aufgaben oder das Erforlgreiche Abschließen von einnem Spiel
  endGame(success: boolean): void {
    console.log("Kommt man so weit, dass das Spiel beendet wird?");

    if (!this.gameId) return;

    const secondsUsed = this.clockComp.getTimeInSeconds() ?? 0;

    this.http.post(`http://localhost:8080/api/stats/end/${this.gameId}`, {
      completed: success,
      timeUsed: secondsUsed
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe();
    
    this.gameEnded = true;
    if(!success){
      this.router.navigate(['']);
    }
  }

  return(): void {
    this.router.navigate(['']);
  }

  newGame(): void {
    window.location.reload();
  }


  //Für einen Nutzerhinweis, wenn er das Fenster schließen oder aktualisieren will
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.gameEnded && this.gameId) {
      event.preventDefault();
      event.returnValue = '';
    }
  }
}
