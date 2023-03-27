// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

import firebase from "firebase";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAijBaQq1q5uTpvU3gptrIfubrsjc5ttSo",
  authDomain: "netflic-clone-yt-965a2.firebaseapp.com",
  projectId: "netflic-clone-yt-965a2",
  storageBucket: "netflic-clone-yt-965a2.appspot.com",
  messagingSenderId: "409357758082",
  appId: "1:409357758082:web:9e9b07d8aa245b5d898e9b"
};

const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=firebase.auth();


// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
// Initialize Firebase

export {auth};
export default db;

