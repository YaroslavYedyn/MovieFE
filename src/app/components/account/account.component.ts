import {Component, OnInit} from '@angular/core';
import {IUser} from '../../models';
import {UserService} from '../../services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const id = this.userService.getUserId();
    this.userService.getUserById(id).subscribe(value => this.user = value);
  }

}
