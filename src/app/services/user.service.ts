import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../models';
import {HttpClient} from '@angular/common/http';

const enum endpoint {
  movie = 'movies/',
  users = 'users/',
  auth = 'auth',
  activate = 'email/activate',
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:5050/';


  constructor(private httpClient: HttpClient) {
  }

  createAccount(user): Observable<IUser> {
    console.log(user);
    return this.httpClient.post<IUser>(`${this.URL}${endpoint.users}`, user);
  }

  activateAccount(token): Observable<void> {
    return this.httpClient.post<void>(`${this.URL}${endpoint.activate}`, {token});
  }
}
