import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';
import { TitlesInterface } from '../view-entry/titles';
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
    title: this.titleArray[this.index].title,
    file: this.titleArray[this.index].file,
    is_chosen: this.titleArray[this.index].is_chosen
  }
  file: Blob = new Blob
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
    if (event.target.files[0].type === 'application/pdf' || event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
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
  saveChanges(): void {
    const storageRef = ref(storage, `${localStorage.getItem('name')}/${this.titleData.title}`);
    uploadBytes(storageRef, this.file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        this.titleData.file = url
        saveAs(url)
      })
    })
    this.titleArray[this.index] = this.titleData
    console.log(this.titleData)
    this.titlesService.update(this.titleObject.id, { titles: JSON.stringify(this.titleArray) }).subscribe(response => { this.router.navigate(['capstone-titles']) })

  }
}
