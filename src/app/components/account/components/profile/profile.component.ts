import {Component, OnInit} from '@angular/core';

// @ts-ignore
import {IUser} from '../../../../models';
import {Router} from '@angular/router';
import {UserService} from '../../../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  back;
  backdrop;
  user: IUser;
  baseUrlImg = 'http://localhost:5050/';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userService.getUserId()).subscribe(value => {
      this.user = value;
      this.backdrop = this.baseUrlImg + value.avatar;
    });
  }

  handleFileInput(files: any): void {
    // tslint:disable-next-line:variable-name
    const _id = this.userService.getUserId();
    const selectedFile = files[0];
    const uploadData = new FormData();
    uploadData.append('upload_file', selectedFile, selectedFile.name);
    this.userService.updateUser({_id}, uploadData).subscribe(value => {
      // @ts-ignore
      if (value.n === 0 && value.nModified === 0 && value.ok === 0) {
        this.userService.getUserById(this.userService.getUserId()).subscribe(value1 => {
          this.user = value1;
          this.backdrop = this.baseUrlImg + value1.avatar;
        });
      }
    });

  }

}
