import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBh-SpKn-2i2eMjmz0rB5nyFSrSKRcoerQ",
  authDomain: "bigg-boss-tamil-584db.firebaseapp.com",
  databaseURL: "https://bigg-boss-tamil-584db.firebaseio.com",
  projectId: "bigg-boss-tamil-584db",
  storageBucket: "bigg-boss-tamil-584db.appspot.com",
  messagingSenderId: "128083349449",
  appId: "1:128083349449:web:b78a26fe8b7767d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
