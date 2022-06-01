// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA56IuLrOF1ATXm0B_MDrwdWGQhFIJ8ujQ",
  authDomain: "email-password-auth-d44f6.firebaseapp.com",
  projectId: "email-password-auth-d44f6",
  storageBucket: "email-password-auth-d44f6.appspot.com",
  messagingSenderId: "163044227725",
  appId: "1:163044227725:web:4fb73f5e0ccb532c7940c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;