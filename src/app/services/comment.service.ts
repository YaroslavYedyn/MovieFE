import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../models';

const enum endpoint {
  comment = 'comments/',
}


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private URL = 'http://localhost:5050/';

  constructor(private httpClient: HttpClient) {
  }

  getAllComment(movieId: string): Observable<[IComment]> {
    return this.httpClient.get<[IComment]>(`${this.URL}${endpoint.comment}${movieId}`);
  }

  addComment(comment): Observable<[IComment]> {
    return this.httpClient.post<[IComment]>(`${this.URL}${endpoint.comment}`, comment);
  }

  removeComment(id): Observable<[IComment]> {
    return this.httpClient.delete<[IComment]>(`${this.URL}${endpoint.comment}${id}`);
  }

}
