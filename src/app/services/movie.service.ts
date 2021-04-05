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

  addMovie(object: IMovie): Observable<void> {
    console.log(object);
    const formData = new FormData();
    // @ts-ignore
    formData.append('movie_id', object.movie_id);
    // @ts-ignore
    formData.append('popularity', object.popularity);
    // @ts-ignore
    formData.append('vote_average', object.vote_average);
    // @ts-ignore
    formData.append('vote_count', object.vote_count);
    formData.append('release_date', object.release_date);
    formData.append('title', object.title);
    formData.append('original_title', object.original_title);
    formData.append('original_language', object.original_language);
    formData.append('overview', object.overview);
    // @ts-ignore
    formData.append('genre', object.genre);
    formData.append('trailer', object.video);
    formData.append('backdrop_path', object.backdrop_path);
    formData.append('poster_path', object.poster_path);
    return this.httpClient.post<void>(`${this.URL}${endpoint.movie}`, formData);
  }

  updateMovie(id, data): Observable<any> {
    return this.httpClient.put<any>(`${this.URL}${endpoint.movie}${id}`, data);
  }

  removeMovieByID(id): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}${endpoint.movie}${id}`);
  }
}
