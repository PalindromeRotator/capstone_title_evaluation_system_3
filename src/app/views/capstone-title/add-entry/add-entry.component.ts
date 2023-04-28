import { Component } from '@angular/core';
import { Entry } from './entry'
import { TitlesService } from 'src/app/services/titles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleBlock } from 'typescript/lib/tsserverlibrary';
import Swal from 'sweetalert2';
import { Titles } from 'src/app/models/titles';
import { saveAs } from 'file-saver';
import { buffer } from 'rxjs';
import base64url from 'base64url';

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
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent {
  titleData: Entry = {
    title: '',
    file: '',
  }
  file: Blob = new Blob
  titleObject: Titles = {};
  constructor(private title: TitlesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleObject = JSON.parse(this.route.snapshot.paramMap.get('titleData')!)
  }
  onFileSelected(event: any): void {
    // console.log(event.target.files[0].type)
    // if (event.target.files[0].type === 'application/pdf') {
    //   const fileReader = new FileReader();
    //   fileReader.readAsArrayBuffer(event.target.files[0]);

    //   fileReader.onload = async () => {
    //     const pdfBlob = new Blob([fileReader.result!], { type: 'application/pdf' });
    //     console.log('PDF Blob:', pdfBlob);
    //     this.file = pdfBlob
    //   };
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Invalid file format'
    //   })
    // }
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
  }

  saveChanges(): void {
    console.log(this.file)
    var temp: Entry[] = []
    temp = JSON.parse(this.titleObject.titles!)
    const storageRef = ref(storage, `${localStorage.getItem('name')}/${this.titleData.title}`);
    uploadBytes(storageRef, this.file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        this.titleData.file = url
        temp.push(this.titleData)

        this.title.update(this.titleObject.id, { titles: JSON.stringify(temp) }).subscribe(response => { })
        Swal.fire({
          icon: 'success',
          text: 'Title Added'
        }).then(() => {
          this.router.navigate(['capstone-titles'])
        })
        // saveAs(url)
        // console.log(url)
      })
    })
  }
}
