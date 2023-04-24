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
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    section: localStorage.getItem('section'),
  }
  user_type = localStorage.getItem('user_type')

  constructor(private usersService: UsersService) {

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
