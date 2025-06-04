import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  standalone: false
})
export class PlayComponent {
  
  constructor(private authService: AuthService, private http: HttpClient){}
  
  gameId!: number;

  startGame(): void {
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
  }
}
