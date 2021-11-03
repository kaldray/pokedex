import { useEffect, useState } from "react";
import CardData from "./CardData";
import firebase from "firebase";
import "firebase/firebase-database";
import styled from "styled-components";

const ButtonRegion = styled.button`
  background-color: #ffbb44;
  width: 100px;
  border: 1px solid black;
  border-radius: 10px 10px;
  color: #000000;
  font-size: 14pt;
  font-weight: 400;
  margin-left: 20px;
  font-family: "Noto Sans JP";
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const RegionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  grid-column: 1 / span 3;
  @media screen and (max-width: 768px) {
    grid-column: 1;
    margin-bottom: 50px;
  }
`

const Research = styled.input`
  place-self: center;
  grid-column: 2;
`;

const PokemonCard = () => {
  let [data, setData] = useState([]);
  const [pokemon,setPokemon] = useState([])
  //#region code to fetch data to an api

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("https://app.pokemon-api.xyz/pokemon/all");
  //     const json = await res.json();
  //     setData(json);
  //   };
  //   fetchData();
  // }, []);
  //#endregion


  //Get data from firebase
  useEffect(() => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(897)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
        setPokemon(snapshot.val());
      });
  }, [setData]);

  // fetch data from specifique region
  const PokedexJohto = () => {
    setData(data = pokemon.filter(data=>data.id > 0 && data.id < 152))
  };
  const PokedexKanto = () => {
    setData(data = pokemon.filter(data=>data.id > 151 && data.id < 252))
  };
  const PokedexHoenn = () => {
    setData( data =pokemon.filter(data=>data.id > 252 && data.id < 386))
  };
  const PokedexSinoh = () => {
    setData(data = pokemon.filter(data=>data.id > 386 && data.id < 493))
  };
  const PokedexUnys = () => {
    setData(data = pokemon.filter(data=>data.id > 494 && data.id < 649))
  };
  const PokedexKalos = () => {
    setData(data = pokemon.filter(data=>data.id > 649 && data.id < 721))
  };
  const PokedexAlola = () => {
    setData(data = pokemon.filter(data=>data.id > 722 && data.id < 809))
  };
  const PokedexGalar = () => {
    setData(data = pokemon.filter(data=>data.id > 809 && data.id < 897))
  };



  return (
    <>
      <RegionContainer>
        <ButtonRegion onClick={PokedexJohto}>Johto</ButtonRegion>
        <ButtonRegion onClick={PokedexKanto}>Kanto</ButtonRegion>
        <ButtonRegion onClick={PokedexHoenn}>Hoenn</ButtonRegion>
        <ButtonRegion onClick={PokedexSinoh}>Sinoh</ButtonRegion>
        <ButtonRegion onClick={PokedexUnys}>Unys</ButtonRegion>
        <ButtonRegion onClick={PokedexKalos}>Kalos</ButtonRegion>
        <ButtonRegion onClick={PokedexAlola}>Alola</ButtonRegion>
        <ButtonRegion onClick={PokedexGalar}>Galar</ButtonRegion>
      </RegionContainer>
      {data.map((data) => (
        <CardData data={data} key={data.id} />
      ))}
    </>
  );
};

export default PokemonCard;
