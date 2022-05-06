import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/auth";
import "firebase/compat/storage";
import config from "../credentials";



if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
