import firebase from "firebase";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/authentification";

const firebaseConfig = {
  apiKey: "AIzaSyCHcpTVHRx6M-Kbq-hRMFSmvuA_Ja4MgVw",
  authDomain: "pokedex-9ff59.firebaseapp.com",
  databaseURL: "https://pokedex-9ff59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokedex-9ff59",
  storageBucket: "pokedex-9ff59.appspot.com",
  messagingSenderId: "108977343944",
  appId: "1:108977343944:web:74449f62b947a5e7c304fd",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>,
  document.getElementById("root")
);
