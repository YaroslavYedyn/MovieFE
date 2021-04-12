import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../../services';
import {IRegister} from '../../../../models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Input()
  user: IRegister;
  res: any;
  error: string;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
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
    this.user = {username: this.username.value, password: this.password.value, email: this.email.value};
    const status = this.userService.createAccount(this.user).subscribe(value => {
      this.router.navigate(['check'], {
        relativeTo: this.activatedRoute,
      });
    }, error => {
      alert(error.message);
    });
  }
}
