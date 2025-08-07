import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SessionTimerComponent } from '../session-timer/session-timer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SessionTimerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private AuthService: AuthService) { }

logout() {
    this.AuthService.logout();
  }
}
