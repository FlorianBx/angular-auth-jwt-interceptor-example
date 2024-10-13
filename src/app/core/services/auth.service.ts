import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

interface AuthResponse {
  auth: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private isAuthenticatedSignal = signal<boolean>(false);
  isAuthenticated = computed(() => this.isAuthenticatedSignal());

  async checkAuthentication(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<AuthResponse>('http://localhost:3000/api/auth/isAuthenticated', { withCredentials: true })
      );
      this.isAuthenticatedSignal.set(response.auth);
      return response.auth;
    } catch (error) {
      console.error('Error checking authentication:', error);
      this.isAuthenticatedSignal.set(false);
      return false;
    }
  }

  signIn(credential: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/api/auth/login', credential, { withCredentials: true })
  }

  // async signIn(credential: { email: string; password: string }): Promise<AuthResponse> {
  //   try {
  //     const response = await firstValueFrom(
  //       this.http.post<AuthResponse>('http://localhost:3000/api/auth/login', credential, { withCredentials: true })
  //     );
  //     this.isAuthenticatedSignal.set(response.auth);
  //     return response;
  //   } catch (error) {
  //     console.error('Sign in failed:', error);
  //     this.isAuthenticatedSignal.set(false);
  //     return { auth: false, message: 'Sign in failed' };
  //   }
  // }

  async signOut(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post<void>('http://localhost:3000/api/auth/logout', {}, { withCredentials: true })
      );
      this.isAuthenticatedSignal.set(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async getInitialAuthState(): Promise<boolean> {
    return this.checkAuthentication();
  }
}
