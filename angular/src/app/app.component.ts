import { AuthService } from './authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(
    public router: Router,
    private authService: AuthService) {}
  title = 'Sleepy';

  ngOnInit() {
    this.getActiveUser();
  }

  ToggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const Hamburger = document.querySelector('#hamburger-icon');
    if (Hamburger.classList.contains('active')) {
      document.querySelector('.nav-wrapper').setAttribute('style', 'z-index: 1001');
      Hamburger.classList.remove('active');
    }
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    } else {
      document.querySelector('.nav-wrapper').setAttribute('style', 'z-index: 1009');
      sidebar.classList.add('open');
      Hamburger.classList.add('active');
    }
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          this.user = userData;
        });
  }
}

