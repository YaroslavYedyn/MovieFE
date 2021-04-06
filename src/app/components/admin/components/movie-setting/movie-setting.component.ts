import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MovieService} from '../../../../services';
import {IMovie} from '../../../../models';

// @ts-ignore
import removeIcon from '../../../../image/remove-icon.svg';

@Component({
  selector: 'app-movie-setting',
  templateUrl: './movie-setting.component.html',
  styleUrls: ['./movie-setting.component.css']
})
export class MovieSettingComponent implements OnInit {
  removeIcon = removeIcon;
  isAddMovie = true;
  isRemoveMovie = false;
  movies: [IMovie];
  genderArray = [];

  movieId = new FormControl(0, [Validators.required, Validators.maxLength(20)]);
  popularity = new FormControl(0, [Validators.required]);
  lang = new FormControl('', [Validators.required]);
  originalTitle = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  overview = new FormControl('', [Validators.required]);
  voteAverage = new FormControl(0, [Validators.required]);
  voteCount = new FormControl(0, [Validators.required]);
  releaseDate = new FormControl(0, [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  backdropPath: FormData = new FormData();
  posterPath: FormData = new FormData();
  trailer: FormData = new FormData();
  addForm = new FormGroup({
    movie_id: this.movieId,
    original_language: this.lang,
    original_title: this.originalTitle,
    title: this.title,
    overview: this.overview,
    popularity: this.popularity,
    vote_average: this.voteAverage,
    vote_count: this.voteCount,
    release_date: this.releaseDate,
  });


  value = new FormControl('', [Validators.required]);
  searchForm = new FormGroup({
    title: this.value
  });

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
  }

  addMovie(): void {
    console.log('valid');
    if (this.addForm.valid) {
      console.log('invalid');
      this.movieService.addMovie({
        ...this.addForm.getRawValue(),
        genre: this.genderArray,
        backdrop_path: this.backdropPath[0],
        poster_path: this.posterPath[0],
        video: this.trailer[0]
      }).subscribe(value => {
        alert(value.message);
      }, error => alert(error.statusText));
    }
  }

  search(): void {
    this.movieService.getAllMovie(this.searchForm.getRawValue()).subscribe(value1 => this.movies = value1.data);
  }

  remove(id: string): void {
    this.movieService.removeMovieByID(id).subscribe(value1 => console.log(value1));
    this.movieService.getAllMovie(this.searchForm.getRawValue()).subscribe(value1 => this.movies = value1.data);
  }

  genreAdd(target: any): void {
    console.log(target.value);
    this.genderArray.push(target.value);
    console.log(this.genderArray);
  }

  removeGenre(genre: string): void {
    this.genderArray = this.genderArray.filter(value1 => value1 !== genre);
  }
}
