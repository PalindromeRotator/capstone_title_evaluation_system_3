import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';
import { Router } from '@angular/router';
import { PanelsInterface, TitlesInterface } from './view-entry/titles';
import Swal from 'sweetalert2';
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
  };
  titlesArray: Array<TitlesInterface> = []
  panelsArray: Array<PanelsInterface> = []

  groupArray: Array<Titles> = []

  constructor(private titlesService: TitlesService, private router: Router) { }
  ngOnInit() {
    this.titlesService.getByUserId(parseInt(localStorage.getItem('uid')!)).subscribe(
      response => {
        this.titleObject = response
        this.titlesArray = JSON.parse(response.titles!);
        console.log(JSON.parse(response.titles!))
      }
    )

    this.titlesService.getAll().subscribe(
      response => {
        var tempGroup: Titles[] = []
        response.forEach(function (data) {
          JSON.parse(data.panels!).forEach(function (panelData: any) {
            if (panelData.uid === parseInt(localStorage.getItem('uid')!)) {
              tempGroup.push(data)
            }
          })
        })
        console.log(tempGroup)
        this.groupArray = tempGroup
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

  downloadFile(i: number): void {
    if (i == 0) {
      const url = URL.createObjectURL(new Blob([this.titleObject.title1_blob!]));
      const link = document.createElement('a');
      link.download = `title1.pdf`;
      link.href = url;
      link.click();
    } else if (i == 1) {
      const url = URL.createObjectURL(new Blob([this.titleObject.title2_blob!]));
      const link = document.createElement('a');
      link.download = `title2.pdf`;
      link.href = url;
      link.click();
    }
    else if (i == 2) {
      const url = URL.createObjectURL(new Blob([this.titleObject.title3_blob!]));
      const link = document.createElement('a');
      // link.download = `title3.pdf`;
      link.href = url;
      link.click();
    } else {

    }
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
}
