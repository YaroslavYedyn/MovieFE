import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../../../services/movie.service';
import {IdModel} from '../../models/IdModel';
import {IMovie} from '../../../../models/IMovie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: IdModel;
  movie: IMovie;
  headerBGUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) {
    this.activatedRoute.params.subscribe(value => {
      this.id = this.router.getCurrentNavigation().extras.state as IdModel;
    });
  }

  ngOnInit(): void {
    this.movieService.getMovieByID(this.id).subscribe(value => {
      this.movie = value;
      this.movie.backdrop_path ?
        this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path :
        this.headerBGUrl = 'addad';
    });
  }

}
