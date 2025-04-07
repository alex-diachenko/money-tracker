import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../../environment';
import { Observable, shareReplay } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logoutTimer: any;

  constructor(private httpService: HttpService, private router: Router) {}

  signIn(email: string, password: string): Observable<string> {
    return this.httpService.post(`/${environment.auth.signIn}`, {
      email,
      password,
    });
  }

  signUp(email: string, password: string) {
    return this.httpService
      .post(`/${environment.auth.signUp}`, {
        email,
        password,
      })
      .pipe(shareReplay());
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
    this.startAutoLogoutTimer(token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.removeItem('jwt_token');
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.router.navigate(['/login']);
  }

  private startAutoLogoutTimer(token: string) {
    const decoded: any = jwtDecode(token);
    const expiresAt = decoded.exp * 1000;
    const now = Date.now();
    const timeout = expiresAt - now;

    if (timeout <= 0) {
      this.logout();
    } else {
      this.logoutTimer = setTimeout(() => this.logout(), timeout);
    }
  }

  autoLogin() {
    const token = this.getToken();
    if (token) {
      this.startAutoLogoutTimer(token);
    }
  }
}
