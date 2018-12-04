import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {
  userId: number;
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
        });
  }
  initMap(): void {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const map = L.map('map', { zoomControl: false }).setView([position.coords.latitude, position.coords.longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      },
      function(err) {
        console.log(err);
      }
    );
  }
}
