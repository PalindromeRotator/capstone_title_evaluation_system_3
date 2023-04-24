import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  constructor(private usersService: UsersService) { }
  users: Array<Users> = []
  user_type = localStorage.getItem('user_type')
  public visible = false;
  sectionArray: Array<any> = []
  ngOnInit() {
    if (localStorage.getItem('user_type') === 'capstone_coordinator') {
      this.usersService.getAllFacultyGroup().subscribe(
        response => {
          console.log(response)
          this.users = response
        }
      )
    } else {
      this.usersService.getAllFaculty().subscribe(
        response => {
          console.log(response)
          this.users = response
          this.sectionArray.push(this.getAllSection())
        }
      )
    }

  }

  getAllSection(): void {
    var tempArr: Array<any> = []
    this.usersService.getAllGroup().subscribe(
      response => {
        console.log(response)
        response.forEach(function (data) {
          tempArr.push(data.section)
        })
        this.sectionArray = Array.from(new Set(tempArr))
        console.log(Array.from(new Set(tempArr)))
      }
    )

  }

  acceptUser(id: any): void {
    this.usersService.update(id, { is_verified: true }).subscribe(response => {
      window.location.reload()
    })
  }
  rejectUser(id: any): void {

  }

  assignAsCoordinator(id: any, event: any): void {
    this.usersService.update(id, { section: event.target.value }).subscribe(
      response => {
        Swal.fire({
          icon: 'info',
          text: 'Successfully Assigned.'
        })
      }
    )
  }
}