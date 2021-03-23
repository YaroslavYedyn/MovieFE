import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../../models/IUser';
import {MovieService} from '../../../../services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';

// import errorMessage from '../../../../constants/error.messages';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Input()
  users: IUser;
  res: any;
  error: string;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  form = new FormGroup({
    username: this.username,
    password: this.password,
    email: this.email,
  });

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  auth(): void {
    this.users = {username: this.username.value, password: this.password.value, email: this.email.value};
    const status = this.userService.createAccount(this.users).subscribe(value => {
      this.router.navigate(['check'], {
        relativeTo: this.activatedRoute,
      });
    }, error => {
      // this.error = errorMessage[error.error.customCode].message;
    });
  }
}
