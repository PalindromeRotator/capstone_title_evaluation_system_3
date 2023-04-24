import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private usersService: UsersService) { }
  loginUser(): void {
    const data = {
      email: this.userData.email,
      password: this.userData.password,
    };
    if (data.email !== '' && data.password !== '') {
      this.usersService.get(data)
        .subscribe(
          response => {
            if (response.is_verified) {
              localStorage.setItem('uid', response.id)
              localStorage.setItem('token', 'authenticated')
              localStorage.setItem('name', response.name!);
              localStorage.setItem('email', response.email!);
              localStorage.setItem('section', response.section!);
              localStorage.setItem('user_type', response.user_type!);
              if (response.user_type === 'admin') {
                this.router.navigate(['/dashboard']);
              }
              else {
                this.router.navigate(['/profile']);
              }
            } else {
              Swal.fire({
                icon: 'warning',
                text: 'Your account is on review. Please wait for the admin to verify your account.'
              })
            }

          },
          error => {
            if (error.status == 404)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username or Password is Incorrect.'
              })
          });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Forms cannot be empty'
      })
    }

  }
}
