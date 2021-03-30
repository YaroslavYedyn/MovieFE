import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {MovieService} from '../../../../services';
import {IMovie} from '../../../../models';

@Component({
  selector: 'app-movie-setting',
  templateUrl: './movie-setting.component.html',
  styleUrls: ['./movie-setting.component.css']
})
export class MovieSettingComponent implements OnInit {
  isAddMovie = true;
  isRemoveMovie = false;
  backdropPath;
  movies: [IMovie];

  movieId = new FormControl(0, [Validators.required]);
  popularity = new FormControl(0, [Validators.required]);
  lang = new FormControl('', [Validators.required]);
  originalTitle = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  overview = new FormControl('', [Validators.required]);
  voteAverage = new FormControl(0, [Validators.required]);
  voteCount = new FormControl(0, [Validators.required]);
  releaseDate = new FormControl(0, [Validators.required]);
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
    const movieData = {...this.addForm.getRawValue()};
    console.log(this.addForm.getRawValue());
    const uploadData = new FormData();
    uploadData.append('upload_file', this.backdropPath, this.backdropPath.name);
    console.log(uploadData);
    this.movieService.addMovie(uploadData).subscribe(value => console.log(value));

  }

  handleBackdropInput(target: any): void {
    if (target.files.length > 0) {
      const selectedFile = target.files[0];
      this.backdropPath = selectedFile;
      // const uploadData = new FormData();
      // uploadData.append('upload_file', this.backdropPath, this.backdropPath.name);
      // this.movieService.addMovie(uploadData).subscribe(value => console.log(value));


    }

  }

  search(): void {
    this.movieService.getAllMovie(this.searchForm.getRawValue()).subscribe(value1 => this.movies = value1.data);
  }

  remove(id: string): void {
    this.movieService.removeMovieByID(id).subscribe(value1 => console.log(value1));
  }
}
