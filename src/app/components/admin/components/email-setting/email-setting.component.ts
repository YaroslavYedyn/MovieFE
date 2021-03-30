import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services';
import {IUser} from '../../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent implements OnInit {
  users: [IUser];
  popupStatus = false;

  topic = new FormControl('', [Validators.required]);
  text = new FormControl('', [Validators.required]);
  allUser = new FormControl(false);
  user;
  email = new FormGroup({
    topic: this.topic,
    text: this.text
  });

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers({}).subscribe(value => this.users = value.data);

  }

  sendMail(): void {
    if (this.email.valid) {
      if (this.allUser.value) {
        this.userService.sendMail(this.email.getRawValue(), this.users).subscribe(value => alert(value), error => alert(error));
      } else {
        console.log('log');
        this.userService.sendMail(this.email.getRawValue(), [this.user]).subscribe(value => alert(value), error => alert(error));
      }
    } else {
      alert('form required');
    }

  }

  popup(): void {
    console.log(this.email);
    this.popupStatus = !this.popupStatus;
    console.log('popup');
  }

  select(user): void {
    this.user = user;
    this.popupStatus = !this.popupStatus;
  }
}
