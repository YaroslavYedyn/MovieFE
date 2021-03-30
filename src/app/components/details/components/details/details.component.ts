import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService, UserService} from '../../../../services';
import {IMovie, IdModel, IUser} from '../../../../models';
// @ts-ignore
import backdrop from '../../../../image/backdrop.jpg';
// @ts-ignore
import heart from '../../../../image/heart.svg';
// @ts-ignore
import heartBlack from '../../../../image/heart-black.svg';

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
  user: IUser;
  isWishlist;
  vote;
  heart = heart;
  heartBlack = heartBlack;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private userService: UserService) {
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
    this.userService.getUserById(this.userService.getUserId()).subscribe(value => {
      this.user = value;
      this.isWishlist = value.wishlist.some(value1 => value1 === this.movie.id);
    });
  }

  addWishlist(id: string): any {
    const userId = this.userService.getUserId();
    const wishlist = this.user.wishlist;
    if (!this.user.wishlist || this.user.wishlist.length === 0) {
      this.isWishlist = true;
      this.userService.updateUser({_id: userId}, {wishlist: [id]}).subscribe(value => this.user = value);
    }
    if (this.user.wishlist && this.user.wishlist.length >= 1) {
      if (wishlist.some(value => value === id)) {
        const newWishlist = wishlist.filter(value => value !== id);
        this.isWishlist = newWishlist.some(value => value === this.movie.id);
        this.userService.updateUser({_id: userId}, {wishlist: newWishlist}).subscribe(value => this.user = value);
      } else {
        wishlist.push(id);
        this.isWishlist = wishlist.some(value => value === this.movie.id);
        this.userService.updateUser({_id: userId}, {wishlist}).subscribe(value => this.user = value);
      }
    }
  }
}
