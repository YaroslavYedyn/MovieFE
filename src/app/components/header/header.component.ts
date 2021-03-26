import {Component, OnInit} from '@angular/core';
import {AuthService, RoleGuardService, UserService} from '../../services';
import {Router} from '@angular/router';
// @ts-ignore
import accountImg from '../../image/account.svg';
import {IUser} from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accountImg;
  baseUrlImg = 'http://localhost:5050/';


  constructor(public authService: AuthService,
              public roleService: RoleGuardService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountImg = accountImg;
  }

  logIn(): void {
    this.router.navigate(['auth']);
  }

  logout(): void {
    this.authService.removeTokens();

    this.router.navigate(['']);
  }
}
