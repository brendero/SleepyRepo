import { Router } from '@angular/router';
import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userLogout();
  }
  userLogout(): void {
    this.authService.userLogout();

    this.router.navigateByUrl('/');
  }
}
