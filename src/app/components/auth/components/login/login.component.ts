import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IToken} from '../../../../models';
import {AuthService} from '../../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  auth: {};
  token: IToken;
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  form = new FormGroup({
    password: this.password,
    email: this.email,
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.auth = {password: this.password.value, email: this.email.value};
    this.authService.login(this.auth).subscribe(value => {
      this.token = value;
      localStorage.setItem('access_token', value.access_token);
      localStorage.setItem('refresh_token', value.refresh_token);
    }, error => {
      this.error = error;
      console.log(error);
    });

    console.log(this.token);
  }
}
