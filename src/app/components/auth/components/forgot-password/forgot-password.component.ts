import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  forgot = new FormGroup({
    email: this.email
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  sendTokenForMail(): void {
    console.log(this.forgot.getRawValue());
    this.userService.sendTokenForgotPassword(this.forgot.getRawValue()).subscribe(value => {
      this.router.navigate(['auth/check']);
    });
  }
}
