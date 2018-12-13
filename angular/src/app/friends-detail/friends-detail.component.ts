import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../User';

@Component({
  selector: 'app-friends-detail',
  templateUrl: './friends-detail.component.html',
  styleUrls: ['./friends-detail.component.sass']
})
export class FriendsDetailComponent implements OnInit {
  user: User;
  activeUserId: number;
  friendList: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
    this.getActiveUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.authService.getUserById(id)
        .subscribe(userData => {
          this.user = userData;
        });
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
        .subscribe(activeUser => {
          console.log(activeUser);
          this.friendList = activeUser.acf.friends;
          this.activeUserId = activeUser.id;
          this.checkIfFriends();
        });
  }
  goBack(): void {
    this.location.back();
  }
  checkIfFriends(): void {
    const userId = +this.route.snapshot.paramMap.get('id');
    const addFriendBtn = document.querySelector('.addFriend-btn');
    const friendSymbol = document.querySelector('.friendSymbol');
    const btnText = document.querySelector('#btnText');

    if (this.friendList.indexOf(userId) > -1) {
      console.log('whaddup');
      addFriendBtn.classList.add('btn-active');
      friendSymbol.classList.remove('fa-plus');
      friendSymbol.classList.add('fa-check');
      btnText.textContent = 'Friends';
    } else {
      console.log('not friends');
      addFriendBtn.classList.remove('btn-active');
      friendSymbol.classList.add('fa-plus');
      friendSymbol.classList.remove('fa-check');
      btnText.textContent = 'Add as friend';
    }
  }

  toggleFriend(): void {
    const userId = +this.route.snapshot.paramMap.get('id');
    const index = this.friendList.indexOf(userId);
    if (index > -1) {
      this.friendList.splice(index, 1);
      this.authService.updateFriends(this.activeUserId, this.friendList)
        .subscribe(Data => {
          this.checkIfFriends();
        });
    } else {
      this.friendList.push(userId);
      this.authService.updateFriends(this.activeUserId, this.friendList)
        .subscribe(Data => {
          this.checkIfFriends();
        });
    }
  }
}
