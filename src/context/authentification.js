import firebase from "firebase";
import "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

const UserContext = createContext();

//GoogleUser context to pass user to other components
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push("/Home");
      } else {
        setUser(null);
        history.push("/");
      }
      return user;
    });
  }, [setUser, history]);
  return (
    <>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </>
  );
};

export { UserContext, UserContextProvider };
