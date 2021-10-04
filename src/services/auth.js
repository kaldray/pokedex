import firebase from "firebase";
import "firebase/auth";
import { useEffect } from "react";
import { useHistory } from "react-router";
import firebaseConfig from "./config";

export const AuthWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log(user);
      redirect();
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  function redirect() {
    window.location.href = "http://localhost:3000/Home";
  }
};

export function getCurrentUser() {
  const user = firebase.auth().currentUser;

  return user;
}

export const onAuth = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    return user;
  });
};



