import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
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
  user_type = localStorage.getItem('user_type')

  constructor(private usersService: UsersService) {
    this.usersService.getById(localStorage.getItem('uid')).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  ngOnInit() {

  }

  saveChanges(): void {
    this.usersService.update(localStorage.getItem('uid'), this.userData).subscribe(
      subscribe => {

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Edited Data'
        }
        ).then(() => {
          localStorage.setItem('name', this.userData.name!);
          localStorage.setItem('email', this.userData.email!);
        })
      }
    )
  }
}
