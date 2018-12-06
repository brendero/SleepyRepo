import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
declare let L;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {
  userId: number;
  userFriends: any;
  users: User[];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getActiveUser();
    this.initMap();
    // TODO: Display friends on map
    // TODO: updateUserLocation
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
      .subscribe(userData => {
        this.userId = userData.id;
        this.userFriends = userData.acf.friends;
        this.DisplayFriends();
      });
  }
  searchUsers(): void {

  }
  initMap(): void {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // TODO: add User location to API
        const map = L.map('map', { zoomControl: false }).setView([position.coords.latitude, position.coords.longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        const userIcon = L.icon({
          // TODO: set icon as current user profile picture
          iconUrl: '../../assets/img/Logo.svg',
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        });
        L.marker([position.coords.latitude, position.coords.longitude], {icon: userIcon}).addTo(map).bindPopup('this is the user');
      },
      function(err) {
        console.log(err);
      }
    );
  }

  DisplayFriends(): void {
    // TODO: filter all users to only show friends
    console.log(this.userFriends);
    this.userFriends.forEach(friend => {
      this.authService.getUserById(friend)
          .subscribe(friendData => {
            console.log(friendData);
            const customPopup = `${friendData.name}<br/><img src='${friendData.acf.avatar}' style="border-radius:100%;"/>`;

            L.marker([friendData.acf.location.lat, friendData.acf.location.lng]).addTo(map).bindPopup(customPopup);
          });
    });
    // TODO: get location of friends
    // TODO: use that location to put marker on map
    // TODO: make custom popup that shows user information
    // TODO: make custom marker that uses friends avatar
  }
}
