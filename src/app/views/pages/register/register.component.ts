import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app)

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    section: '',
    password: '',
    confirmPassword: '',
    user_define_id: '',
    user_type: 'capstone_group',
    expertise: '',
  };
  constructor(private router: Router, private usersService: UsersService) { }
  registerUser(): void {
    const data = {
      email: this.userData.email,
      name: this.userData.name,
      section: this.userData.section,
      password: this.userData.password,
      confirmPassword: this.userData.password,
      user_type: this.userData.user_type,
      user_define_id: this.userData.user_define_id,
      is_verified: false,
      expertise: this.userData.expertise,
    };
    if (data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.name !== '') {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.usersService.create(data)
            .subscribe(
              response => {
                Swal.fire({
                  icon: 'success',
                  text: 'Please wait the admin to aprrove your account'
                }).then(() => {
                  this.router.navigate(['']);
                })

              },
              error => {
                console.log(error)
                if (error.status == 404)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username or Password is Incorrect.'
                  })
              });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Forms cannot be empty ${data.email}`
      })
    }

  }

  onItemChange(event: any): void {
    console.log(" Value is : ", event.target.value);
  }
}
