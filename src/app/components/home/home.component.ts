import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services';
import {IMovie, IQuery, IResponse} from '../../models';

// @ts-ignore
import nextIcon from '../../image/next.svg';
// @ts-ignore
import lastIcon from '../../image/last.svg';
// @ts-ignore
import removeIcon from '../../image/remove-black.svg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nextIcon = nextIcon;
  lastIcon = lastIcon;
  removeIcon = removeIcon;
  movies: IMovie[];
  data: IResponse;
  query: IQuery;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.query = {
      page: 1,
      not_genre: ['Мультфільм']
    };
    this.getAllMovieByParams(this.query);
  }

  getAllMovieByParams(queryParams: IQuery): void {
    this.movieService.getAllMovie(queryParams).subscribe(value => {
      this.movies = value.data;
      this.data = value;
    });
  }

  paginationStatic(staticPage: number): void {
    this.query.page = staticPage;
    this.getAllMovieByParams(this.query);
  }

  handlePage(num: number): void {
    this.query.page = +this.data.page + num;
    this.getAllMovieByParams(this.query);
  }

  searchMovie(target: any): void {
    this.query.title = target.value;
    this.getAllMovieByParams(this.query);
  }

  handleYearSearch(target: any): void {
    this.query.year = target.value;
    this.getAllMovieByParams(this.query);
  }

  handleGenreSearch(target: any): void {
    this.query.genre = target.value;
    this.getAllMovieByParams(this.query);
  }

  sortByParams(target: any): void {
    const query = target.value.split(',');
    this.query.sortBy = query[1];
    this.query.order = query[0];
    this.getAllMovieByParams(this.query);
  }

  removeQuery(valueObject: any): void {
    const removeQuery = Object.keys(this.query).find(value => this.query[value] === valueObject);
    delete this.query[removeQuery];
    this.getAllMovieByParams(this.query);
  }
}
