import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { User, Meta } from '../User';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

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
  registerForm: FormGroup;
  httpErrorMessage: string;
  submitted: false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('', Validators.required),
    });
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      const default_avatar = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png';
      const { username, firstName, lastName, email, password } = this.registerForm.value;
      this.user = new User(username, firstName, lastName, password, email, default_avatar);
      console.log(this.user);
      this.authService.createUser(this.user)
            .subscribe(() => this.router.navigateByUrl('/'), err => this.httpErrorMessage = err.error.message );
    } else {
      this.submitted = true;
    }
  }
}
