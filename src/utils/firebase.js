import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD2B6Z0ZppY3pFUiA3OeD9UmEkmCI-Braw",
  authDomain: "awsomeproject-84942.firebaseapp.com",
  databaseURL: "https://awsomeproject-84942.firebaseio.com",
  projectId: "awsomeproject-84942",
  storageBucket: "awsomeproject-84942.appspot.com",
  messagingSenderId: "273491956948",
  appId: "1:273491956948:web:dae749028879c576f7d741",
  measurementId: "G-R74HXPZH0H",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig;
