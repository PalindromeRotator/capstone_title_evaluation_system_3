import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private usersService: UsersService) { }
  loginUser(): void {
    const data = {
      email: this.userData.email,
      password: this.userData.password,
    };
    if (data.email !== '' && data.password !== '') {
      this.usersService.get(data)
        .subscribe(
          response => {
            if (response.is_verified) {
              signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  localStorage.setItem('uid', response.id)
                  localStorage.setItem('token', 'authenticated')
                  localStorage.setItem('name', response.name!);
                  localStorage.setItem('email', response.email!);
                  localStorage.setItem('section', response.section!);
                  localStorage.setItem('user_type', response.user_type!);
                  if (response.user_type === 'admin') {
                    this.router.navigate(['/dashboard']);
                  }
                  else {
                    this.router.navigate(['/profile']);
                  }
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                  })
                });

            } else {
              Swal.fire({
                icon: 'warning',
                text: 'Your account is on review. Please wait for the admin to verify your account.'
              })
            }

          },
          error => {
            if (error.status == 404)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username or Password is Incorrect.'
              })
          });


    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Forms cannot be empty'
      })
    }

  }
  goToForgotPassword() {
    this.router.navigate(['/forgot-password'])
  }
}
