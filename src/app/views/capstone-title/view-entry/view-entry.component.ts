import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlesInterface, PanelsInterface } from './titles'
import { TitlesService } from 'src/app/services/titles.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss']
})
export class ViewEntryComponent {
  user_type = localStorage.getItem('user_type')
  titleString: string = "";
  titleObject = {
    "id": 0,
    "group_name": "",
    "section": "",
    "adviser": "",
    "panels": "",
    "titles": "",
    "grades": "",
    "comments": "",
    "user_id": "",
    "requests": "",
    "coordinator_requests": "",
  };
  titlesArray: Array<TitlesInterface> = []
  panelsArray: Array<PanelsInterface> = []
  titlesScoreObject = {
    title_1: 0,
    title_2: 0,
    title_3: 0
  }
  facultyList: Array<any> = []
  adviserRequests: Array<any> = []
  coordinatorRequests: Array<any> = []
  adviser: any = {
    uid: 0,
    name: ''
  }
  file: Blob = new Blob
  // adviserObject = JSON.parse(this.titleObject.adviser)
  constructor(private route: ActivatedRoute, private users: UsersService, private titles: TitlesService, private router: Router, private http: HttpClient) { }
  ngOnInit() {
    this.users.getAllFaculty().subscribe(
      response => {
        this.facultyList = response
      }
    )
    this.titleString = this.route.snapshot.paramMap.get('titleData')!
    this.titleObject = JSON.parse(this.titleString);
    console.log(this.titleObject.grades)

    this.titlesArray = JSON.parse(this.titleObject.titles)
    this.panelsArray = JSON.parse(this.titleObject.panels)
    this.titlesScoreObject = JSON.parse(this.titleObject.grades)
    this.adviserRequests = JSON.parse(this.titleObject.requests);
    this.coordinatorRequests = JSON.parse(this.titleObject.coordinator_requests);
    this.adviser = JSON.parse(this.titleObject.adviser)
  }

  downloadFile(url: string): void {
    saveAs(url, 'download.pdf')
    console.log(url)
  }

  onFileSelected(event: any, index: any): void {
    console.log(event.target.files[0].type)
    if (event.target.files[0].type === 'application/pdf') {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        if (!inputElement.files[0]) {
          return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
          const blob = new Blob([fileReader.result as ArrayBuffer], { type: event.target.files[0].type });
          this.file = blob
        };
        fileReader.readAsArrayBuffer(event.target.files[0]);
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Invalid file format'
      })
    }
  }

  goToEvaluate(): void {
    this.router.navigate(['evaluate-title', this.titleObject.id])
  }
  accept(data: any): void {
    this.titles.update(this.titleObject.id, { adviser: JSON.stringify(data), requests: "[]" }).subscribe(
      response => {
        Swal.fire({ icon: 'success', text: 'Request Accepted. View Panel will close to refresh data.' })
          .then(() => {
            this.router.navigate(['/capstone-titles'])
          })
      })
  }

  assignAsPanel(data: any): void {
    var temp = []
    temp = JSON.parse(this.titleObject.coordinator_requests)
    temp.push({ uid: data.id, name: data.name, role: 'panel' })
    this.titles.update(this.titleObject.id, { coordinator_requests: JSON.stringify(temp) }).subscribe(
      response => {
        Swal.fire({ icon: 'success', text: 'Successfully Request. View Panel will close to refresh data.' })
          .then(() => {
            this.router.navigate(['/capstone-titles'])
          })
      })
  }
  assignAsAdviser(data: any): void {
    var temp = []
    temp = JSON.parse(this.titleObject.coordinator_requests)
    temp.push({ uid: data.id, name: data.name, role: 'adviser' })
    this.titles.update(this.titleObject.id, { coordinator_requests: JSON.stringify(temp) }).subscribe(
      response => {
        Swal.fire({ icon: 'success', text: 'Successfully Request. View Panel will close to refresh data.' })
          .then(() => {
            this.router.navigate(['/capstone-titles'])
          })
      })
  }

  acceptCoordinator(data: any): void {
    if (data.role === 'panel') {
      var temp = []
      temp = JSON.parse(this.titleObject.panels);
      temp.push({ uid: data.uid, name: data.name })
      this.titles.update(this.titleObject.id, { panels: JSON.stringify(temp), coordinator_requests: "[]" }).subscribe(
        response => {
          Swal.fire({ icon: 'success', text: 'Request Accepted. View Panel will close to refresh data.' })
            .then(() => {
              this.router.navigate(['/capstone-titles'])
            })
        })
    } else {
      this.titles.update(this.titleObject.id, { adviser: JSON.stringify({ uid: data.uid, name: data.name }), coordinator_requests: "[]" }).subscribe(
        response => {
          Swal.fire({ icon: 'success', text: 'Request Accepted. View Panel will close to refresh data.' })
            .then(() => {
              this.router.navigate(['/capstone-titles'])
            })
        })
    }

  }

  addPanelAdviser(datas: Users): void {
    Swal.fire({
      title: 'Add as?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Panel',
      denyButtonText: `Adviser`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var arr = this.panelsArray
        var flag = false
        if (arr.length === 3 && (this.adviser.uid !== 0 || this.adviser)) {
          Swal.fire({
            icon: 'error',
            text: 'Panel is full.'
          })
        }
        else {
          for (let data of arr) {
            if (data.uid === datas.id) {
              flag = true
            }
          }
          if (flag) {
            Swal.fire({
              icon: 'error',
              text: 'Panel already in the list'
            })
          } else {
            this.panelsArray.push({ uid: datas.id, name: datas.name! })
            this.titles.update(this.titleObject.id, { panels: JSON.stringify(this.panelsArray) }).subscribe(response => { })
          }
          console.log(datas)
        }

      } else if (result.isDenied) {
        var obj = this.adviser
        var flag = false
        if (this.adviser.uid) {
          Swal.fire({
            icon: 'error',
            text: 'Adviser is full.'
          })
        }
        else {
          this.adviser = { uid: datas.id, name: datas.name! }
          this.titles.update(this.titleObject.id, { adviser: JSON.stringify(this.adviser) }).subscribe(response => { })

        }
      }
    })
  }

  chooseTitle(data: any, index: any): void {
    Swal.fire({
      icon: 'success',
      text: `Title ${data.title} is chosen`
    })
    this.titlesArray[index] = { title: data.title, file: data.file, is_chosen: true }
    this.titles.update(this.titleObject.id, { titles: JSON.stringify(this.titlesArray) }).subscribe(response => { })
  }
}
