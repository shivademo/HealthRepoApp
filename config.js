
import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA4gavWJCUfvXPoVUPZtAqOfj_MHCz3AgY",
    authDomain: "healthrepo-de4a9.firebaseapp.com",
    projectId: "healthrepo-de4a9",
    storageBucket: "healthrepo-de4a9.appspot.com",
    messagingSenderId: "1055792322601",
    appId: "1:1055792322601:web:b9c0b29e4582747b4b6438"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};