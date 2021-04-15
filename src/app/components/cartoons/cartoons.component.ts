import {Component, OnInit, Output} from '@angular/core';
import {MovieService} from '../../services';
import {IMovie, IQuery, IResponse} from '../../models';

// @ts-ignore
import nextIcon from '../../image/next.svg';
// @ts-ignore
import lastIcon from '../../image/last.svg';
// @ts-ignore
import nextSlideIcon from '../../image/next-slide.svg';

@Component({
  selector: 'app-cartoons',
  templateUrl: './cartoons.component.html',
  styleUrls: ['./cartoons.component.css']
})
export class CartoonsComponent implements OnInit {
  movies: IMovie[];
  data: IResponse;
  baseUrlImg = 'http://localhost:5050/';
  headerBGUrl;
  index = 0;
  query: IQuery;
  nextIcon = nextIcon;
  lastIcon = lastIcon;
  slideIcon = nextSlideIcon;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.query = {
      genre: ['Мультфільм'],
      limit: 10
    };
    this.movieService.getAllMovie(this.query).subscribe(value => {
      this.movies = value.data;
      this.data = value;
      this.headerBGUrl = this.baseUrlImg + this.movies[this.index].backdrop_path;
    });
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

  slide(num): void {
    this.index = this.index + num;
    if (this.index === this.movies.length) {
      this.index = 0;
    }
    if (this.index < 0) {
      this.index = this.movies.length - 1;
    }
  }
}
