import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services';
import {IUser} from '../../../../models';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent implements OnInit {
  user: [IUser];

  topic = new FormControl('');
  text = new FormControl('');
  allUser = new FormControl(false);
  email = new FormGroup({
    topic: this.topic,
    text: this.text
  });

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers({}).subscribe(value => this.user = value.data);

  }

  sendMail(): void {
    console.log(this.email.getRawValue());
    console.log(this.user);
    this.userService.sendMail(this.email.getRawValue(), this.user).subscribe(value => console.log(value));
  }
}
