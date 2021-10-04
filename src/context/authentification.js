import firebase from "firebase";
import "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      return user;
    });
  }, [setUser]);
  return (
    <>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </>
  );
};

export { useUserContext, UserContext, UserContextProvider };
