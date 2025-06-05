import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  minutes = 0;
  seconds = 0;
  private timer: any;
  isPaused = false;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.seconds++;
        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
        }
      }
    }, 1000);
  }

  pause(): void {
    this.isPaused = !this.isPaused;
  }

  getTimeInSeconds(): number {
    return this.minutes * 60 + this.seconds;
  }

  reset(): void {
    this.minutes = 0;
    this.seconds = 0;
  }
}
