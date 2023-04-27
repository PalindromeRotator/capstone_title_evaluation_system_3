import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlesInterface, PanelsInterface } from './titles'
import { TitlesService } from 'src/app/services/titles.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
    this.titlesArray = JSON.parse(this.titleObject.titles)
    this.panelsArray = JSON.parse(this.titleObject.panels)
    this.titlesScoreObject = JSON.parse(this.titleObject.grades)
    this.adviserRequests = JSON.parse(this.titleObject.requests);
    this.coordinatorRequests = JSON.parse(this.titleObject.coordinator_requests);
    this.adviser = JSON.parse(this.titleObject.adviser)
    console.log(JSON.parse(this.titleObject.requests));
  }

  // downloadFile(): void {
  //   const url = URL.createObjectURL(new Blob([this.capsuleData.blob_file]));
  //   const link = document.createElement('a');
  //   link.download = `${this.capsuleData.title}.pdf`;
  //   link.href = url;
  //   link.click();

  //   console.log(this.capsuleData.blob_file)
  //   console.log(url)
  // }

  onFileSelected(event: any, index: any): void {
    // const selectedFile = <File>event.target.files[0];
    // let blob = new Blob(event.target.files, { type: event.target.files[0].type });
    // let url = window.URL.createObjectURL(blob);
    // this.capsuleData.file = event.target.files[0].name
    // this.capsuleData.blob_file = blob
    console.log(event.target.files[0].type)
    if (event.target.files[0].type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);

      fileReader.onload = () => {
        const pdfBlob = new Blob([fileReader.result!], { type: 'application/pdf' });
        console.log('PDF Blob:', pdfBlob);
        // this.titlesArray[index] = { "id": index, "title": event.target.files[0].name, "blob_file": pdfBlob }
        // this.capsuleData.file = event.target.files[0].name
        // this.capsuleData.blob_file = pdfBlob
        // console.log(pdfBlob)
      };
    } else {
      console.log('Invalid file type. Only PDF files are allowed.');
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
}
