import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService, MovieService, UserService} from '../../../../services';
import {IMovie, IdModel, IUser, IComment} from '../../../../models';
// @ts-ignore
import backdrop from '../../../../image/backdrop.jpg';
// @ts-ignore
import heart from '../../../../image/heart.svg';
// @ts-ignore
import heartBlack from '../../../../image/heart-black.svg';
// @ts-ignore
import removeIcon from '../../../../image/remove.svg';
// @ts-ignore
import defaultAvatar from '../../../../image/account-comment.svg';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: IdModel;
  movie: IMovie;
  user: IUser;
  comments: [IComment];
  headerBGUrl: string;
  baseUrl = 'http://localhost:5050/';
  isWishlist;
  vote;
  heart = heart;
  heartBlack = heartBlack;
  removeIcon = removeIcon;
  defaultAvatar=defaultAvatar
  removeStatus;

  comment = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(350)]);
  commentForm = new FormGroup({
    comment: this.comment
  });

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private commentService: CommentService,
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
      this.commentService.getAllComment(value._id).subscribe(value1 => this.comments = value1);
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

  addComment(): void {
    const comment = {...this.commentForm.getRawValue(), user_id: this.user._id, movie_id: this.movie._id};
    this.commentService.addComment(comment).subscribe(value => this.comments = value);
  }

  removeComment(id: string): void {
    console.log(id);
    this.commentService.removeComment(id).subscribe(value => this.comments = value);
  }
}
