import {Component, OnInit} from '@angular/core';
import {MovieService, UserService} from '../../../../services';
import {IUser} from '../../../../models';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  user: IUser;
  status;
  URl = environment.URL;

  constructor(private userService: UserService,
              private movieService: MovieService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userService.getUserId()).subscribe(value => this.user = value);
  }

  play(id: string): void {
    localStorage.setItem('id', JSON.stringify(id));
    this.router.navigate([`details/${id}`]);
  }

  removeFromWishlist(id: string): void {
    const wishlist = this.user.wishlist;
    if (wishlist.some(value => value === id)) {
      console.log('вже є');
      console.log(wishlist);
      const newWishlist = wishlist.filter(value => value !== id);
      this.userService.updateUser({_id: this.user._id}, {wishlist: newWishlist}).subscribe(value => this.user = value);
    }
  }
}
