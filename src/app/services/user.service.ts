import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAllUser, IResponse, IUser} from '../models';
import {HttpClient} from '@angular/common/http';

const enum endpoint {
  users = 'users',
  auth = 'auth',
  activate = 'email/activate',
  send_mail = 'email/send',
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:5050/';


  constructor(private httpClient: HttpClient) {
  }

  setUserId(id: string): void {
    localStorage.setItem('user_id', id);
  }

  getUserId(): string {
    return localStorage.getItem('user_id');
  }

  getUsers(query): Observable<IAllUser> {
    return this.httpClient.get<IAllUser>(`${this.URL}${endpoint.users}`, {params: query});
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.URL}${endpoint.users}/${id}`);
  }


  createAccount(user): Observable<IUser> {
    console.log(user);
    return this.httpClient.post<IUser>(`${this.URL}${endpoint.users}`, user);
  }

  activateAccount(token): Observable<void> {
    return this.httpClient.post<void>(`${this.URL}${endpoint.activate}`, {token});
  }

  updateUser(query, updateBody): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}${endpoint.users}`, updateBody, {params: query});
  }

  sendMail(message, users): Observable<void> {
    return this.httpClient.post<void>(`${this.URL}${endpoint.send_mail}`, {...message, users});
  }
}
