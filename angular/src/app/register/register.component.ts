import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { User, Meta } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  user: User;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser(): void {
    this.user = new User();
    this.user.username = this.username;
    this.user.firstname = this.firstName;
    this.user.lastname = this.lastName;
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.meta = new Meta();
    this.user.meta.avatar = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png';

    this.authService.createUser(this.user)
          .subscribe(() => this.router.navigateByUrl('/'));
  }
}
