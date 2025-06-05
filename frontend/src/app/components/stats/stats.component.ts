import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatsComponent implements OnInit {
  stats: any[] = [];

  //Berechnete Statistiken für die Gesamtübersicht
  totalGames = 0;
  successfulGames = 0;
  failedGames = 0;
  avgSuccessTime = 0;

  isLoggedIn = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  //Initialisierung: Datenzugriff mit dem Nutzeraccount
  ngOnInit(): void {
    const username = this.auth.getUsername();
    this.isLoggedIn = !!username;

    if (username) {
      this.http.get<any[]>(`http://localhost:8080/api/stats/${username}`)
        .subscribe(data => {
          this.stats = data;

          // Berechnungen:
          this.totalGames = data.length;
          this.successfulGames = data.filter(s => s.completed).length;
          this.failedGames = this.totalGames - this.successfulGames;

          const totalSuccessTime = data
            .filter(s => s.completed)
            .reduce((sum, s) => sum + s.timeUsed, 0);

          this.avgSuccessTime = this.successfulGames > 0
            ? Math.round(totalSuccessTime / this.successfulGames)
            : 0;
        });
    }
  }

  //Hilfsmethode um die Anzahl der Sekunden als Minuten darzustellen
  formatTime(seconds: number): string {
    if (seconds === 0) return 'nicht erfasst';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }


}