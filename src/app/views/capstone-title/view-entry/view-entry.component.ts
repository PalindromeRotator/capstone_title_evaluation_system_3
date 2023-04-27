import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlesInterface, PanelsInterface } from './titles'
import { TitlesService } from 'src/app/services/titles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss']
})
export class ViewEntryComponent {
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
  };
  titlesArray: Array<TitlesInterface> = []
  panelsArray: Array<PanelsInterface> = []
  // adviserObject = JSON.parse(this.titleObject.adviser)
  constructor(private route: ActivatedRoute, private users: UsersService, private titles: TitlesService, private router: Router, private http: HttpClient) { }
  ngOnInit() {

    this.titleString = this.route.snapshot.paramMap.get('titleData')!
    this.titleObject = JSON.parse(this.titleString);
    this.titlesArray = JSON.parse(this.titleObject.titles)
    this.panelsArray = JSON.parse(this.titleObject.panels)
    console.log(this.titlesArray)
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

  saveChanges(): void {

  }
}
