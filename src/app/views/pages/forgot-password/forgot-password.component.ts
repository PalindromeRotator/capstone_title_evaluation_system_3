import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2';

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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email!: string;
  constructor(private router: Router) { }

  sendPasswordResetEmail(): void {
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: `Successfully sent a password reset email in ${this.email}. Check your inbox.`
        }).then(() => {
          this.router.navigate([''])
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}
