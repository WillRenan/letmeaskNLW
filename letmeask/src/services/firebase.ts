import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyCOVYij-1tcSRcPHBXJ9OJ3RF20eiYiePU",
  authDomain: "letmeask-3741a.firebaseapp.com",
  databaseURL: "https://letmeask-3741a-default-rtdb.firebaseio.com",
  projectId: "letmeask-3741a",
  storageBucket: "letmeask-3741a.appspot.com",
  messagingSenderId: "1048703402227",
  appId: "1:1048703402227:web:20b3c4661108ab811df786"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();