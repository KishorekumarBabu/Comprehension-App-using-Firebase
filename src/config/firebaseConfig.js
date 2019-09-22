import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAZv9J5ycX5QLLjy4O7Q-xkBOYYUDAZMac",
  authDomain: "comprehension-9241d.firebaseapp.com",
  databaseURL: "https://comprehension-9241d.firebaseio.com",
  projectId: "comprehension-9241d",
  storageBucket: "comprehension-9241d.appspot.com",
  messagingSenderId: "855510256419",
  appId: "1:855510256419:web:3ab04a2841685783"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
