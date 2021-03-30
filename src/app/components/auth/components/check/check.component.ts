import {Component, OnInit} from '@angular/core';

// @ts-ignore
import checkImage from '../../../../image/check.jpg';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  image = checkImage;

  constructor() {
  }

  ngOnInit(): void {
  }

}
