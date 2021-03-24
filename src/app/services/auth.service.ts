import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IToken} from '../models';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';


const enum endpoint {
  login = 'auth/',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:5050/';

  constructor(private httpClient: HttpClient) {
  }

  login(body): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.URL}${endpoint.login}`, body);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }
}
