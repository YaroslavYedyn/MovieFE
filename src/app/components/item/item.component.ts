import {Component, Input, OnInit} from '@angular/core';
import {IMovie} from '../../models/IMovie';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item: IMovie;
  baseUrlImg = 'https://image.tmdb.org/t/p/original';

  constructor(private  router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  details(id): void {
    localStorage.setItem('id', JSON.stringify(id));
    this.router.navigate([`details/${id}`], {
      relativeTo: this.activatedRoute,
      state: id
    });
  }
}
