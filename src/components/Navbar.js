import styled from "styled-components";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/authentification";
import { ReactComponent as Pokeball } from "../assets/pokeball.svg";

const Nav = styled.nav`
  background-color: #ffbb44;
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "Noto Sans JP";
  font-size: 14pt;
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  font-weight: bold;
  height: fit-content;
  border: none;
  margin: 20px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;
export const Header = styled.header`
  width: 100vw;
`;

const Navbar = () => {
  let history = useHistory();

  //Sign out from firebase
  const LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  const { user } = useContext(UserContext);
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Header>
        <Nav>
          <Pokeball onClick={goToTop}></Pokeball>
          {user ? (
            <>
              <Button onClick={LogOut}>Deconnexion</Button>
            </>
          ) : (
            <>
              <Button to="/Signin">Sign in</Button>
              <Button>Sign up</Button>
            </>
          )}
        </Nav>
      </Header>
    </>
  );
};

export default Navbar;
