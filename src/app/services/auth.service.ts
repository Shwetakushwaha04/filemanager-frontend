import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000'; // FastAPI backend URL

  constructor(private http: HttpClient, private router: Router) {}

  /** Login and store token in localStorage */
  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', email); // OAuth2 expects "username"
    body.set('password', password);

    return this.http
      .post(`${this.API_URL}/token`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.access_token); // Store token
        })
      );
  }

  /** Register a new user */
  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      email: email,
      name: name,
      password: password,
    };
    return this.http.post(`${this.API_URL}/register`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /** Logout and remove token */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /** Get stored JWT token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
