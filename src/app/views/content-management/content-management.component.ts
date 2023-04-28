import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent {
  contentData = {
    file: localStorage.getItem('content-image') ?? "../../../assets/img/brand/favicon0.png",
    blob_file: null,
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.contentData.file = reader.result as string; // Set the image source to display the preview
    };
  }

  saveChanges(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'Changing content will make you logged out, Are you sure?',
      showCancelButton: true,
      confirmButtonText: "OK",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('content-image', this.contentData.file)
        localStorage.removeItem('name');
        localStorage.removeItem('uid',)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('user_type')
        this.router.navigate(['/'])
      } else {

      }
    })

  }
}
