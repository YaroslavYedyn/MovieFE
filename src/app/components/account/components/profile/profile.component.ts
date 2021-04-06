import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import backdrop from '../../../../image/account.svg';
import {Router} from '@angular/router';
import {UserService} from '../../../../services';
import {IUser} from '../../../../models';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editStatus = false;
  changePasswordStatus = false;
  back;
  backdrop = backdrop;
  backdropImg;
  user: IUser;
  baseUrlImg = 'http://localhost:5050/';

  name = new FormControl('harry', [Validators.required]);
  gender = new FormControl('чоловік', [Validators.required]);
  age = new FormControl('19', [Validators.required]);
  username = new FormControl('Harry19', [Validators.required]);
  editForm = new FormGroup({
    name: this.name,
    gender: this.gender,
    age: this.age,
    username: this.username,
  });

  oldPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  changePasswordForm = new FormGroup({
    old_password: this.oldPassword,
    new_password: this.newPassword,
  });

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userService.getUserId()).subscribe(value => {
      this.user = value;
      this.backdropImg = this.baseUrlImg + value.avatar;
    }, error => alert(error.message));
  }

  handleFileInput(files: any): void {
    // tslint:disable-next-line:variable-name
    const id = this.userService.getUserId();
    const selectedFile = files[0];
    const uploadData = new FormData();
    uploadData.append('upload_file', selectedFile, selectedFile.name);
    console.log(uploadData);
    this.userService.updateUser({_id: id}, uploadData).subscribe(value => {
      this.user = value;
      this.backdropImg = this.baseUrlImg + value.avatar;
    });

  }

  edit(): void {
    const id = this.userService.getUserId();
    console.log(this.editForm.getRawValue());
    this.userService.updateUser({_id: id}, this.editForm.getRawValue()).subscribe(value => {
      this.editStatus = !this.editStatus;
      this.userService.getUserById(this.userService.getUserId()).subscribe(value1 => this.user = value1);
    }, error => console.log(error));
  }

  changePassword(): void {
    this.userService.changePassword({
      ...this.changePasswordForm.getRawValue(),
      user_id: this.userService.getUserId()
    }).subscribe(value => alert(value.message), error => alert(error.error.message));
  }
}
