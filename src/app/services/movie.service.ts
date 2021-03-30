import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResponse, IMovie} from '../models';


const enum endpoint {
  movie = 'movies/',
  users = 'users/'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private URL = 'http://localhost:5050/';

  constructor(private httpClient: HttpClient) {
  }

  getAllMovie(query = null): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.URL}${endpoint.movie}`, {params: query ? query : ''});
  }

  getMovieByID(id): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${this.URL}${endpoint.movie}${id}`);
  }

  addMovie(movie): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}${endpoint.movie}`, movie, {
      reportProgress: true,
      observe: 'events'
    });
  }

  removeMovieByID(id): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}${endpoint.movie}${id}`);
  }
}
