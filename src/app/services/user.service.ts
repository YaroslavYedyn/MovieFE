import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAllUser, IResponse, IUser} from '../models';
import {HttpClient} from '@angular/common/http';

const enum endpoint {
  users = 'users/',
  forgot_password = 'forgotPassword/',
  change_password = 'changePassword',
  auth = 'auth',
  activate = 'email/activate',
  send_mail = 'email/send',
  send_forgot_token = 'email/sendForgotToken',

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

  updateUser(query, updateBody): Observable<IUser> {
    console.log(updateBody);
    return this.httpClient.put<IUser>(`${this.URL}${endpoint.users}`, updateBody, {params: query});
  }

  changePassword(object): Observable<any> {
    return this.httpClient.patch<any>(`${this.URL}${endpoint.users}${endpoint.change_password}`, object);
  }

  sendTokenForgotPassword(email): Observable<void> {
    return this.httpClient.post<void>(`${this.URL}${endpoint.send_forgot_token}`, email);
  }

  forgotPassword(token, password): Observable<void> {
    return this.httpClient.patch<void>(`${this.URL}${endpoint.users}${endpoint.forgot_password}`, {token, ...password});
  }

  sendMail(message, users): Observable<void> {
    console.log({...message, users});
    return this.httpClient.post<void>(`${this.URL}${endpoint.send_mail}`, {...message, users});
  }
}
