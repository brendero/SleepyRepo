import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Subject, Observable } from 'rxjs';
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
  private map;
  private searchTerms = new Subject<string>();
  users$: Observable<User[]>;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.authService.searchUsers(term)));
    this.getActiveUser();
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
      .subscribe(userData => {
        this.userId = userData.id;
        this.userFriends = userData.acf.friends;
        this.initMap();
        this.DisplayFriends();
      });
  }

  initMap() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.authService.updateLocation(this.userId , position.coords.latitude, position.coords.longitude)
            .subscribe();
            this.map = L.map('map', {zoomControl: false}).setView([position.coords.latitude, position.coords.longitude], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);
            const userIcon = L.icon({
              iconUrl: '../../assets/img/Logo.svg',
              iconSize: [38, 95],
              iconAnchor: [22, 94],
              popupAnchor: [-3, -76],
            });
            L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map).bindPopup('this is the user');
          },
          function(err) {
            console.log(err);
          });
        } else {
          alert('geolocation is not supported by this browser');
        }
  }

  DisplayFriends(): void {
    this.userFriends.forEach(friend => {
      this.authService.getUserById(friend)
          .subscribe(friendData => {
            const customPopup = `<a href='/friends/${friendData.id}' style="display:flex; align-items:center;"><img src='${friendData.meta.avatar}' style='width:54px; height: 54px;border-radius: 100%; padding: 5px;'/>${friendData.name}</a>`;
            L.marker([friendData.acf.location.lat, friendData.acf.location.lng]).addTo(this.map).bindPopup(customPopup);
          });
    });
  }
  toggleSearchBar() {
    const form = document.querySelector('.form-wrapper');

    if (form.classList.contains('openInput')) {
      form.classList.remove('openInput');
      form.setAttribute('style', 'z-index: none;');
    } else {
      form.classList.add('openInput');
      form.setAttribute('style', 'z-index: 1001;');
    }
  }
}
