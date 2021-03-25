import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // router = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.removeTokens();
    this.router.navigate(['']);
  }
}
