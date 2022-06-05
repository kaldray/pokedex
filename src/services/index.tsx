import firebase from "firebase";

const authWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      if (error) {
        throw new Error("error");
      }
    });
};

const logOut = () => {
  firebase.auth().signOut();
};

export { authWithGoogle, logOut };
