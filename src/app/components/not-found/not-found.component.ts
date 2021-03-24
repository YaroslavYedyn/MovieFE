import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// @ts-ignore
import notFound from '../../image/notFound.jpg';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  image;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.image = notFound;
  }

  redirect(): void {
    this.router.navigate(['']);
  }
}
