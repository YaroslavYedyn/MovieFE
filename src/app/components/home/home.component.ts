import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services';
import {IMovie, IResponse} from '../../models';

// @ts-ignore
import nextIcon from '../../image/next.svg';
// @ts-ignore
import lastIcon from '../../image/last.svg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nextIcon = nextIcon;
  lastIcon = lastIcon;
  movies: IMovie[];
  data: IResponse;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getAllMovie({page: 1, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
      console.log(value);
    });
  }

  paginationStatic(staticPage: number): void {
    this.movieService.getAllMovie({page: staticPage, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
      console.log(value);
    });
  }

  handlePage(num: number): void {
    const page = +this.data.page + num;
    this.movieService.getAllMovie({page, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
      console.log(value);
    });
  }

  searchMovie(target: any): void {
    this.movieService.getAllMovie({title: target.value, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
    });
  }

  handleYearSearch(target: any): void {
    console.log(target.value);
    this.movieService.getAllMovie({year: target.value, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
    });
  }

  handleGenreSearch(target: any): void {
    console.log(target.value);
    this.movieService.getAllMovie({genre: target.value, not_genre: ['Мультфільм']}).subscribe(value => {
      this.movies = value.data;
      this.data = value;
    });
  }
}
