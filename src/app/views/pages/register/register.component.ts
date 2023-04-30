import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    section: '',
    password: '',
    confirmPassword: '',
    user_define_id: '',
    user_type: 'capstone_group',
    expertise: '',
  };
  constructor(private router: Router, private usersService: UsersService) { }
  registerUser(): void {
    const data = {
      email: this.userData.email,
      name: this.userData.name,
      section: this.userData.section,
      password: this.userData.password,
      confirmPassword: this.userData.password,
      user_type: this.userData.user_type,
      user_define_id: this.userData.user_define_id,
      is_verified: false,
      expertise: this.userData.expertise,
    };
    if (data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.name !== '') {
      this.usersService.create(data)
        .subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              text: 'Please wait the admin to aprrove your account'
            }).then(() => {
              this.router.navigate(['']);
            })

          },
          error => {
            console.log(error)
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
        text: `Forms cannot be empty ${data.email}`
      })
    }

  }

  onItemChange(event: any): void {
    console.log(" Value is : ", event.target.value);
  }
}
