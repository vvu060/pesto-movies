import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1LsJlDIAOYu1chN53MiZ0imHEEd8_cDI",
  authDomain: "vmovies-6ff98.firebaseapp.com",
  projectId: "vmovies-6ff98",
  storageBucket: "vmovies-6ff98.appspot.com",
  messagingSenderId: "633784879403",
  appId: "1:633784879403:web:0f969715655076b7ee9d6e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = firebase.auth();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { auth, providerGoogle, providerFacebook };
