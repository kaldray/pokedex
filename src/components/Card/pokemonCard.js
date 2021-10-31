import { useEffect, useState } from "react";
import CardData from "./CardData";
import firebase from "firebase";
import "firebase/firebase-database";
import styled from "styled-components";

const ButtonRegion = styled.button`
  background-color: #ffbb44;
  width: 150px;
  border: 1px solid black;
  border-radius: 10px 10px;
  color: #ffffff;
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
  const [data, setData] = useState([]);
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
      .limitToFirst(151)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, [setData]);

  // fetch data from specifique region
  const PokedexKanto = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(386)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
        console.log(data);
      });
  };
  const PokedexHoenn = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(386)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };
  const PokedexSinoh = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(493)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };
  const PokedexUnys = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(649)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };
  const PokedexKalos = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(721)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };
  const PokedexAlola = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(809)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };
  const PokedexGalar = () => {
    const pokedexRef = firebase.database().ref("pokedex");
    pokedexRef
      .limitToFirst(897)
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  };

  return (
    <>
      <RegionContainer>
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
