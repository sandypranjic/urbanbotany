import firebase from "firebase/app";
import "firebase/database";
import '@firebase/firestore';
import '@firebase/storage';

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2jvrQtoLHRaf7MBBrw_MVbBvugHW2A-E",
    authDomain: "urban-botany.firebaseapp.com",
    databaseURL: "https://urban-botany.firebaseio.com",
    projectId: "urban-botany",
    storageBucket: "urban-botany.appspot.com",
    messagingSenderId: "43720213145",
    appId: "1:43720213145:web:7e64c7d6d097d91a5dee08"
};


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();
export const listOfPlants = dbRef.child("plants");
export const storage = firebase.storage();

export default dbRef;
