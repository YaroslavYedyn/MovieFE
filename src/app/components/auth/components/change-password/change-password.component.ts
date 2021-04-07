import {Component, OnInit} from '@angular/core';
import {IToken} from '../../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  token: string;

  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  changePasswordForm = new FormGroup({
    password: this.password
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = window.location.search.split('=')[1];
  }

  changePassword(): void {
    this.userService.forgotPassword(this.token, this.changePasswordForm.getRawValue()).subscribe(value => {
      this.router.navigate(['auth/login']);
    }, error => {
      console.log(error);
    });
  }
}
