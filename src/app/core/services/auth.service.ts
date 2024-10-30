import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError, of } from 'rxjs';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
}

interface CheckAuthResponse {
  auth: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private isAuthenticatedSignal = signal<boolean>(false);

  isAuthenticated = this.isAuthenticatedSignal.asReadonly();


  signIn(credential: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/auth/login', credential, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (!!response.user.id) {
            console.log(response.user.id);
            this.isAuthenticatedSignal.set(!!response.user.id);
            this.router.navigate(['/']);
          }
        }),
      );
  }

  signUp(credential: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        'http://localhost:3000/api/auth/register',
        credential,
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => {
          if (!!response.user.id) {
            this.isAuthenticatedSignal.set(!!response.user.id);
            this.router.navigate(['/']);
          }
        }),
      );
  }

  signOut(): void {
    this.http
      .post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true },
      )
      .subscribe({
        next: () => {
          this.isAuthenticatedSignal.set(false),
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error while signing out:', err),
          this.isAuthenticatedSignal.set(false);
          this.router.navigate(['/']);
        },
      });
  }

  checkAuthentication(): Observable<boolean> {
    return this.http.get<CheckAuthResponse>(
        'http://localhost:3000/api/auth/isAuthenticated', { withCredentials: true },
      ).pipe(
        tap({
          next: (response) => this.isAuthenticatedSignal.set(response.auth),
          error: () => this.isAuthenticatedSignal.set(false)
        }),
        map((response) => response.auth),
        catchError((error) => {
          console.error('Check authentication error', error);
          return of(false);
        }),
      )
  }

  initializeAuth(): void {
    this.checkAuthentication().subscribe();
  }
}
