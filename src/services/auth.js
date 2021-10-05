import firebase from "firebase";
import "firebase/auth";

export const onAuth = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    return user;
  });
};
