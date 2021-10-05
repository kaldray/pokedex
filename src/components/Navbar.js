import styled from "styled-components";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/authentification";
import { ReactComponent as Pokeball } from "../assets/pokeball.svg";

const Nav = styled.nav`
  background-color: #ffbb44;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const Button = styled(Link)`
  background-color: transparent;
  color: white;
  font-weight: bold;
  height: fit-content;
  margin: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;
export const Header = styled.header`
  width: 100%;
`;

const Navbar = () => {
  let history = useHistory();

  const LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
      });
    history.push("/");
  };

  const { user } = useContext(UserContext);
  return (
    <>
      <Header>
        <Nav>
          <Pokeball></Pokeball>
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
