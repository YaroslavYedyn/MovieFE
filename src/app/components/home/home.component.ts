import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services';
import {IMovie} from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: IMovie[];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe(value => {
      this.movies = value.data;
      console.log(this.movies);
    });
  }

}
