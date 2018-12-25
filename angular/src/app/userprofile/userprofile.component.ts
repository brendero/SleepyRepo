import { FileReaderService } from './../fileReaderService/file-reader.service';
import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User, Meta } from '../User';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.sass']
})
export class UserprofileComponent implements OnInit {
  user: User;
  image64: string;
  meta: Meta;
  sliderValue: number;

  constructor(
    private authService: AuthService,
    private fileReaderService: FileReaderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getActiveUser();
  }
  goBack() {
    this.location.back();
  }

  setProfilepicture($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
      this.fileReaderService.readFile(file)
          .subscribe(data => {
              this.user.meta.avatar = data;

              this.authService.updateUserPicture(this.user.id, this.user.meta.avatar)
                  .subscribe();
            });
      }
  }

  getActiveUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          this.user = userData;
          this.sliderValue = userData.meta.slaapdoel;
        });
  }

  sliderMove(): void {
    this.authService.updateSlaapdoel(this.user.id, this.sliderValue)
        .subscribe();
  }
}
