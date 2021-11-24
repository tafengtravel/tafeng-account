// Import the functions you need from the SDKs you need
import  firebase  from 'firebase/compat/app'; //記得從compat引入 不要問我為甚麼
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from './router'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYLp1AZezHuoCsdejK-OzHoE9QGn5FzJw',
  authDomain: 'tafengtravel-7cf35.firebaseapp.com',
  databaseURL: 'https://tafengtravel-7cf35.firebaseio.com',
  projectId: 'tafengtravel-7cf35',
  storageBucket: 'tafengtravel-7cf35.appspot.com',
  messagingSenderId: '603783037525',
  appId: '1:603783037525:web:e9a174481faf508a170adc'
};


// Initialize Firebase
export const firebaseApp =  firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore()

// firebaseApp.auth().onAuthStateChanged(function(user) {

//     if (user) {
//       // if is logged in, redirect to the home page
//     }else{
//       this.$router.push({ path: '/login' })
//     }
  
// });
