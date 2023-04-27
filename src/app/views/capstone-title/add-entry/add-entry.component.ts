import { Component } from '@angular/core';
import { Entry } from './entry'
import { TitlesService } from 'src/app/services/titles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleBlock } from 'typescript/lib/tsserverlibrary';
import Swal from 'sweetalert2';
import { Titles } from 'src/app/models/titles';
@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent {
  titleData: Entry = {
    title: '',
  }
  file: Blob = new Blob
  titleObject: Titles = {};
  constructor(private title: TitlesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleObject = JSON.parse(this.route.snapshot.paramMap.get('titleData')!)
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
        this.file = pdfBlob
      };
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Invalid file format'
      })
    }
  }

  saveChanges(): void {
    var titleList = JSON.parse(JSON.parse(this.route.snapshot.paramMap.get('titleData')!).titles)
    titleList.push(this.titleData)
    if (titleList.length == 1) {
      this.title.update(this.titleObject.id, { title1_blob: this.file, titles: JSON.stringify(titleList) }).subscribe(response => { this.router.navigate(['capstone-titles']) })

    } else if (titleList.length == 2) {
      this.title.update(this.titleObject.id, { title2_blob: this.file, titles: JSON.stringify(titleList) }).subscribe(response => { this.router.navigate(['capstone-titles']) })
    }
    else if (titleList.length == 3) {
      this.title.update(this.titleObject.id, { title3_blob: this.file, titles: JSON.stringify(titleList) }).subscribe(response => { this.router.navigate(['capstone-titles']) })
    }
    else {

    }

    // this.title.update(parseInt(this.route.snapshot.paramMap.get('id')!), { titles: JSON.stringify(this.temp) }).subscribe(
    //   response => {
    //     this.router.navigate(['/capstone-titles']);
    //   }
    // )

    // var t = decoder.decode(buffer);
    // const encoder = new TextEncoder();
    // const buffer2 = encoder.encode(t);
    // console.log(new Blob([buffer2], { type: 'application/pdf' }))
  }

  // blobToString(blob: Blob): Promise<string> {
  //   const buffer = await blob.arrayBuffer();
  //   const decoder = new TextDecoder("utf-8");
  //   return decoder.decode(buffer);
  // }

  // stringToBlob(str: string): Promise<Blob> {
  //   const encoder = new TextEncoder();
  //   const buffer = encoder.encode(str);
  //   return new Blob([buffer]);
  // }
}
