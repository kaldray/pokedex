import Navbar from "../components/Navbar";
import PokemonCard from "../components/Card/pokemonCard";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../context/authentification";
import { useHistory } from "react-router";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  margin-top: 50px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  row-gap: 50px;
  align-items: center;
  justify-items: center;
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const Home = () => {
  const VerifyUser = () => {
    let history = useHistory();
    const { user } = useContext(UserContext);
    if (!user) history.push("/");
  };
  VerifyUser();
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <PokemonCard />
      </Container>
    </>
  );
};

export default Home;
