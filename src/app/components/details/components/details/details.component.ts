import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../../../services/movie.service';
import {IdModel} from '../../models/IdModel';
import {IMovie} from '../../../../models/IMovie';
// @ts-ignore
import backdrop from '../../../../image/backdrop.jpg';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: IdModel;
  movie: IMovie;
  headerBGUrl: string;
  baseUrl = 'http://localhost:5050/';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) {
    this.activatedRoute.params.subscribe(value => {
      this.id = this.router.getCurrentNavigation().extras.state as IdModel;
    });
  }

  ngOnInit(): void {
    this.movieService.getMovieByID(this.id ? this.id : JSON.parse(localStorage.getItem('id'))).subscribe(value => {
      this.movie = value;
      this.movie.backdrop_path ?
        this.headerBGUrl = this.baseUrl + this.movie.backdrop_path :
        this.headerBGUrl = backdrop;
    });
  }

}
