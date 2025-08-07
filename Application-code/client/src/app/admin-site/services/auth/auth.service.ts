import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.siteUrl + '/api/login';

  constructor(private http: HttpClient, private router : Router) { }

  login(email: string, password: any) {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  refreshToken(): Observable<any>  {
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, {}, this.authHeaders());
  }

    private authHeaders() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
