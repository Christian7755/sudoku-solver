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

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    const username = this.auth.getUsername();
    if (username) {
      this.http.get<any[]>(`http://localhost:8080/api/stats/${username}`)
        .subscribe(data => this.stats = data);
    }
  }
}