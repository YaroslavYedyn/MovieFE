import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services';
import {IUser} from '../../../../models';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  user: IUser;
  wishlist: Array<any>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userService.getUserId()).subscribe(value => this.user = value);
  }

}
