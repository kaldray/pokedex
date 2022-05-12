import firebase from "firebase";
import "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

export type AuthentificationContextData = {
  currentUser: firebase.User | undefined;
  uid: string | undefined;
};

const UserContext = createContext<AuthentificationContextData | undefined>(
  undefined
);

//GoogleUser context to pass user to other components
const UserContextProvider = ({ children }: any) => {
  const [currentUser, setUser] = useState<firebase.User | undefined>(undefined);
  const [uid, setUid] = useState<string | undefined>(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
        navigate("/Home");
      } else {
        setUser(undefined);
        navigate("/");
      }
    });
  }, [setUser, navigate]);
  return (
    <>
      <UserContext.Provider value={{ currentUser, uid }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export function useGoogleAuth(): AuthentificationContextData {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("Must be inside <AuthenticationContextProvider>");
  }

  return ctx;
}

export { UserContext, UserContextProvider };
