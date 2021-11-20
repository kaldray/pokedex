import firebase from "firebase";
import "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

const UserContext = createContext();

//GoogleUser context to pass user to other components
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
        history.push("/Home");
      } else {
        setUser(null);
        history.push("/");
      }
    });
  }, [setUser, history]);
  return (
    <>
      <UserContext.Provider value={{ user, uid }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export { UserContext, UserContextProvider };
