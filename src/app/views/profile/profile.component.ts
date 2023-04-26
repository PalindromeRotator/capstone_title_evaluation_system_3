import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Members } from './members'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData: Users = {
    name: '',
    email: '',
    section: '',
    password: '',
    user_define_id: '',
    user_type: 'capstone_group',
    expertise: '',
    members: ''
  };
  memberArray: Array<Members> = []
  user_type = localStorage.getItem('user_type')
  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.getById(localStorage.getItem('uid')).subscribe(
      response => {
        this.userData = response;
        this.memberArray = JSON.parse(response.members!)
      }
    )
  }

  ngOnInit() {

  }

  goToAddComponent(): void {
    if (this.memberArray.length == 8) {
      Swal.fire({
        icon: 'error',
        text: 'Maximum reached. maximum of 8 memebrs only.'
      })
    }
    else {
      this.router.navigate(['/add-member', JSON.stringify(this.memberArray)])
    }

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
