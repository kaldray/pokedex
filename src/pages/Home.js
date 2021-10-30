import Navbar from "../components/Navbar";
import PokemonCard from "../components/Card/pokemonCard";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  margin-top: 100px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  row-gap: 50px;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: auto;
    row-gap: 0;
  }
`;

const Home = () => {
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
