import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Members } from '../members';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent {

  memberData: Members = {
    fullname: '',
    email: '',
    course: '',
    program: '',
    year_section: '',
  }
  currentMember: Array<Members> = [];
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentMember = JSON.parse(this.route.snapshot.paramMap.get('currentMember')!);
  }

  AddMember(): void {

    this.currentMember.push(this.memberData);
    this.usersService.update(localStorage.getItem('uid'), { members: JSON.stringify(this.currentMember) }).subscribe(
      reponse => {
        this.router.navigate(['profile'])
      }
    )
  }
}
