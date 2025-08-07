import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-session-timer',
  imports: [NgIf],
  templateUrl: './session-timer.component.html',
  styleUrl: './session-timer.component.css'
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  remainingTime = '';  
  intervalId: any;
  showDialog = false;
  private alertShown = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateTimer(): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.remainingTime = 'Non connecté';
      return;
    }

    try {
      const payload: any = jwtDecode(token);
      const exp = payload.exp * 1000;
      const now = Date.now();
      const diff = exp - now;

      if (diff <= 0) {
        this.remainingTime = 'Session expirée';
        this.authService.logout();
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (minutes >= 60) {
        this.remainingTime = `${hours} h ${remainingMinutes} min`;
      } else if (minutes >= 30) {
        this.remainingTime = `${minutes} min`;
      } else {
        this.remainingTime = `${minutes} min ${seconds < 10 ? '0' : ''}${seconds} s`;
      }

      // Alerte 10 minutes avant (seulement une fois)
      if (minutes <= 15 && !this.alertShown) {
        this.alertShown = true;
        this.showDialog = true;
      }

    } catch (err) {
      this.remainingTime = 'Token invalide';
      this.authService.logout();
    }
  }

  confirmRefresh(): void {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.authService.refreshToken().subscribe({
      next: res => {
        localStorage.setItem('authToken', res.token);
        this.alertShown = false;
        this.showDialog = false;
        this.updateTimer();
      },
      error: err => {
        console.error('Erreur lors du rafraîchissement de la session', err);
        this.authService.logout();
      }
    })
  }

  cancelDialog(): void {
    this.showDialog = false;
  }
}