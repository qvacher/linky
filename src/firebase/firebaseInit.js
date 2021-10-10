import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjwpxpPmgSuWJ_hMy1l798FtehhvAc4V0",
  authDomain: "linky-71453.firebaseapp.com",
  projectId: "linky-71453",
  storageBucket: "linky-71453.appspot.com",
  messagingSenderId: "524507047487",
  appId: "1:524507047487:web:3e2503d2e18a6aae7f3a8a"
}; 

const firebaseApp = firebase.initializeApp(firebaseConfig); 

export default firebaseApp.firestore();
