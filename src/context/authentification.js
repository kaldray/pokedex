import firebase from "firebase";
import "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

const UserContext = createContext();

const useUserContext = () => {
  //  get the context
  const context = useContext(UserContext);

  //  if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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

export { useUserContext, UserContext, UserContextProvider };
