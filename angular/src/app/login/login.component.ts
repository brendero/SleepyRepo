import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.userLogin(this.username, this.password)
      .subscribe(tokenData => {
        localStorage.setItem('token', tokenData.token);
        this.router.navigateByUrl('/home');
      }, err => console.log(err));
  }

}
