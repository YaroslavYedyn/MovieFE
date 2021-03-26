import {Component, OnInit} from '@angular/core';

// @ts-ignore
import notAuth from '../../../../image/not-auth.jpg';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.css']
})
export class NotAuthComponent implements OnInit {
  image;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.image = notAuth;
  }

  login(): void {
    this.router.navigate(['auth/login']);
  }

  auth(): void {
    this.router.navigate(['auth']);
  }
}
