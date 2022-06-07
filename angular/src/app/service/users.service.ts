import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../common/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private authUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  getAllUsers(token: any): Observable<Users[]> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Users[]>(this.authUrl + '/user', { headers });
  }
}
