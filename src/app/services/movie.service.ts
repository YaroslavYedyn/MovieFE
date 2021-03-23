import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovie} from '../models/IMovie';
import {IResponse} from '../models/IResponse';


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

  getAllMovie(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.URL}${endpoint.movie}`);
  }

  getMovieByID(id): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${this.URL}${endpoint.movie}${id}`);
  }

}
