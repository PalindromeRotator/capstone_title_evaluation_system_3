import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';
import { TitlesInterface } from '../view-entry/titles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-title',
  templateUrl: './view-title.component.html',
  styleUrls: ['./view-title.component.scss']
})
export class ViewTitleComponent {

  titleArray: Array<TitlesInterface> = JSON.parse(JSON.parse(this.route.snapshot.paramMap.get('data')!).titles)
  titleObject: Titles = JSON.parse(this.route.snapshot.paramMap.get('data')!)
  file1: Blob = JSON.parse(this.route.snapshot.paramMap.get('data')!).title1_blob
  file2: Blob = JSON.parse(this.route.snapshot.paramMap.get('data')!).title2_blob
  file3: Blob = JSON.parse(this.route.snapshot.paramMap.get('data')!).title3_blob
  index: number = parseInt(this.route.snapshot.paramMap.get('index')!)
  titleData = {
    title: this.titleArray[this.index].title
  }
  constructor(private route: ActivatedRoute, private titlesService: TitlesService, private router: Router) { }
  ngOnInit() {
  }

  onFileSelected(event: any): void {
    // const selectedFile = <File>event.target.files[0];
    // let blob = new Blob(event.target.files, { type: event.target.files[0].type });
    // let url = window.URL.createObjectURL(blob);
    // this.capsuleData.file = event.target.files[0].name
    // this.capsuleData.blob_file = blob
    console.log(event.target.files[0].type)
    if (event.target.files[0].type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);

      fileReader.onload = async () => {
        const pdfBlob = new Blob([fileReader.result!], { type: 'application/pdf' });
        console.log('PDF Blob:', pdfBlob);
        if (this.index == 0) {
          this.file1 = pdfBlob
        } else if (this.index == 1) {
          this.file2 = pdfBlob
        }
        else if (this.index == 2) {
          this.file3 = pdfBlob
        }
      };
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Invalid file format'
      })
    }
  }
  saveChanges(): void {
    console.log(this.file2)
    this.titleArray[this.index] = {
      title: this.titleData.title
    }

    if (this.index == 0) {
      this.titlesService.update(this.titleObject.id, { titles: JSON.stringify(this.titleArray), title1_blob: this.file1 }).subscribe(response => { this.router.navigate(['capstone-titles']) })
    } else if (this.index == 1) {
      this.titlesService.update(this.titleObject.id, { titles: JSON.stringify(this.titleArray), title2_blob: this.file2 }).subscribe(response => { this.router.navigate(['capstone-titles']) })
    }
    else if (this.index == 2) {
      this.titlesService.update(this.titleObject.id, { titles: JSON.stringify(this.titleArray), title3_blob: this.file3 }).subscribe(response => { this.router.navigate(['capstone-titles']) })
    }

  }
}
