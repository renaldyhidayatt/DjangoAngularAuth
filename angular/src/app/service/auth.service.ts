import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs';
// import { JWTPayload } from '../common/JwtPayload';
import { tap, shareReplay, map } from 'rxjs/operators';
import { Users } from '../common/User';

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8000/auth';

  authToken: any;
  email: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(this.authUrl + '/register', user).pipe(
      tap((user) => console.log(user)),
      map((user) => user)
    );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.authUrl + '/login', userData);
  }

  getUser(token: any): Observable<Users[]> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Users[]>(this.authUrl + '/user', { headers });
  }

  storeUserData(token: string, email: string) {
    localStorage.setItem('token', token);
    this.authToken = token;
    this.email = email;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  isLoggedIn(): any {
    const token: any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  get currentUser(): any {
    this.loadToken();
    if (!this.authToken) return null;
    return this.jwtHelper.decodeToken(this.authToken);
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }
}
