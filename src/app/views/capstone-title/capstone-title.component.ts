import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';
import { Router } from '@angular/router';
import { PanelsInterface, TitlesInterface } from './view-entry/titles';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

//firebase modules
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZpFe6t1G2p6TB_YmaJy4sy8Blly--Oqc",
  authDomain: "ctes-3.firebaseapp.com",
  projectId: "ctes-3",
  storageBucket: "ctes-3.appspot.com",
  messagingSenderId: "793210221947",
  appId: "1:793210221947:web:99e513ff10bf76b8d7f9de",
  measurementId: "G-D5LC4DH2EF"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

@Component({
  selector: 'app-capstone-title',
  templateUrl: './capstone-title.component.html',
  styleUrls: ['./capstone-title.component.scss']
})
export class CapstoneTitleComponent {
  titleArray: Array<Titles> = []
  user_type = localStorage.getItem('user_type')

  titleString: string = "";
  titleObject: Titles = {
    "id": 0,
    "group_name": "",
    "section": "",
    "adviser": "",
    "panels": "",
    "titles": "",
    "grades": "",
    "comments": "",
    "createdAt": "",
    "updatedAt": "",
    "user_id": 0,
    "coordinator_requests": "",
  };
  titlesArray: Array<TitlesInterface> = []
  panelsArray: Array<PanelsInterface> = []

  groupArray: Array<Titles> = []
  allGroupArray: Array<Titles> = []
  constructor(private titlesService: TitlesService, private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('user_type') === 'capstone_group') {
      this.titlesService.getByUserId(parseInt(localStorage.getItem('uid')!)).subscribe(
        response => {
          this.titleObject = response
          this.titlesArray = JSON.parse(response.titles!);
          console.log(JSON.parse(response.titles!))
        },
        error => {
          console.log(error)
        }
      )
    }


    this.titlesService.getAll().subscribe(
      response => {
        var tempGroup: Titles[] = []
        var tempGroup2: Titles[] = []
        response.forEach(function (data) {
          JSON.parse(data.panels!).forEach(function (panelData: any) {
            if (panelData.uid === parseInt(localStorage.getItem('uid')!)) {
              tempGroup.push(data)
            }
          })

        })
        this.groupArray = tempGroup
        this.allGroupArray = response
      }
    )
  }
  viewEntry(data: any): void {
    const stringifyVar = JSON.stringify(data)
    this.router.navigate(['/view-entry', stringifyVar])
  }

  goToAddTitle(): void {
    if (JSON.parse(this.titleObject.titles!).length == 3) {
      Swal.fire({
        icon: "error",
        text: 'Maximum of 3 titles only'
      })
    } else {
      this.router.navigate(['/add-entry', JSON.stringify(this.titleObject)])
    }

  }

  goToViewTitle(index: number): void {
    this.router.navigate(['/view-title', JSON.stringify(this.titleObject), index])
  }

  downloadFile(data: any): void {
    saveAs(data.file)
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

  request(id: any, currentRequest: any): void {
    var tempArr = JSON.parse(currentRequest)
    tempArr.push({ uid: parseInt(localStorage.getItem('uid')!), name: localStorage.getItem('name') })
    this.titlesService.update(parseInt(id), {
      requests: JSON.stringify(tempArr)
    }).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          text: 'Request sent to become adviser'
        })
      }
    )
  }
}
