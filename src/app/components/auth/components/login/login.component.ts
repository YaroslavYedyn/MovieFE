import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ILogin, IToken} from '../../../../models';
import {AuthService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  auth: ILogin;
  token: IToken;
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  form = new FormGroup({
    password: this.password,
    email: this.email,
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.auth = {password: this.password.value, email: this.email.value};
    this.authService.login(this.auth).subscribe(() => {
      this.router.navigate(['']);
    }, error1 => this.error = error1.error);

  }
}
