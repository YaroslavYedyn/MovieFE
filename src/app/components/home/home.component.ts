import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {IMovie} from '../../models/IMovie';
import {IResponse} from '../../models/IResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: IMovie[];
  response: IResponse;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe(value => {
      this.response = value;
      this.movies = value.data;
    });
    console.log(this.movies);
    console.log(this.response);
  }

}
