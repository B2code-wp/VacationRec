import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  email: string;
  token: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private API_URL = 'http://localhost:3000'; //  backend URL
  private STORAGE_KEY = 'user';

  constructor(private http: HttpClient) {}

setUser(user: any): void {
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
}
  //register
  register(payload: any) {
  return this.http.post('http://localhost:3000/register', payload);
}


  // LOGIN
  login(payload: LoginPayload): Observable<User> {
    const { email, password } = payload;

    //  FAKE BACKEND (replace with API later)
    if (email === 'admin@gmail.com' && password === '123456') {
      const user: User = {
        email,
        token: 'fake-jwt-token-123456',
      };

      return of(user).pipe(
        delay(1000), // simulate API delay
        tap((res) => {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(res));
        })
      );
    } else {
      return throwError(() => ({
        error: { msg: 'Invalid email or password' },
      })).pipe(delay(1000));
    }
  }

  // GET USER
  getUser(): User | null {
    const user = localStorage.getItem(this.STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
