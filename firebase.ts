import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsNME5IFGLyXJQXQA0OcsufZaFF3BAkHw",
  authDomain: "test-cc433.firebaseapp.com",
  projectId: "test-cc433",
  storageBucket: "test-cc433.appspot.com",
  messagingSenderId: "380389500710",
  appId: "1:380389500710:web:138a33feb50cdcedd243e7",
  measurementId: "G-09G22QQW3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
console.log("AUTH--->>>", app);
export {auth, app};