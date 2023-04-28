//Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

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
const analytics = getAnalytics(app);
const storage = getStorage(app)

export class FirebaseConfig {
}