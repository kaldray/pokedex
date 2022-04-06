import styled from "styled-components";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
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
  color: #000000;
  font-weight: 400;
  height: fit-content;
  border: none;
  margin: 0px 20px;
  padding: 5px;
  font-size: 1em;
  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled.header`
  width: 100vw;
`;

const PokeballLogo = styled(Pokeball)`
  :hover {
    cursor: pointer;
  }
`;

const Navbar = () => {
  let navigate = useNavigate();

  //Sign out from firebase
  const LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/");
      });
  };

  const { ...User } = useContext(UserContext);

  const currentUser = User.currentUser;

  const goToTop = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  return (
    <>
      <Header>
        <Nav>
          <PokeballLogo onClick={goToTop}></PokeballLogo>
          {currentUser ? (
            <>
              <Button onClick={LogOut}>Log out</Button>
            </>
          ) : (
            <></>
          )}
        </Nav>
      </Header>
    </>
  );
};

export default Navbar;
