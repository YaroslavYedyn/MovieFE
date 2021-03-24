import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  token: string;
  status: string;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.token = window.location.search.split('=')[1];
    this.userService.activateAccount(this.token).subscribe(value => {
      this.router.navigate(['auth/login']);
    }, error => {
      this.router.navigate(['error']);
    });
  }

}
