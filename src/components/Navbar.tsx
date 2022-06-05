import styled from "styled-components";
import { useGoogleAuth } from "../context/authentification";
import { ReactComponent as Pokeball } from "../assets/pokeball.svg";
import { logOut } from "../services";

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

const Header = styled.header`
  width: 100vw;
`;

const PokeballLogo = styled(Pokeball)`
  :hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 3rem;
  object-fit: contain;
  object-position: center;
  font-size: 12px;
`;

const Navbar = () => {
  const user = useGoogleAuth();

  const goToTop = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <>
      <Header>
        <Nav>
          <PokeballLogo onClick={goToTop}></PokeballLogo>
          {user.currentUser && (
            <>
              <Image
                src={user.currentUser.photoURL || undefined}
                alt="Votre profil"
              />
              <Button onClick={logOut}>Log out</Button>
            </>
          )}
        </Nav>
      </Header>
    </>
  );
};

export default Navbar;
