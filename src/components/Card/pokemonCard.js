import { useEffect, useState, useRef, useContext } from "react";
import CardData from "./CardData";
import firebase from "firebase";
import "firebase/firebase-database";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { UserContext } from "../../context/authentification";
import { pokedexData } from "../../services/pokedexData";

const ButtonRegion = styled.button`
  background-color: #ffbb44;
  width: 100px;
  border: 1px solid black;
  border-radius: 30px 30px;
  color: #000000;
  font-size: 14pt;
  font-weight: 400;
  margin-left: 20px;
  font-family: "Noto Sans JP";
  max-height: 31px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    width: 80px;
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
`;
const ResearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2;
  @media screen and (max-width: 768px) {
    grid-column: 1;
    margin-bottom: 50px;
  }
`;
const Research = styled.input`
  place-self: center;
  border-radius: 30px 30px;
  height: 31px;
  margin-bottom: 30px;
`;
const ResearchButton = styled.button`
  grid-row: 2;
  width: 100px;
  grid-column: 2;
  place-self: center;
  border-radius: 30px 30px;
  height: 31px;
  border-color: black;
  :hover {
    cursor: pointer;
  }
`;
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  margin-top: 50px;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 6px solid transparent;
  border-bottom-color: #ffbb44;
  border-top-color: #ffbb44;
  animation: ${spin} 1s infinite;
  grid-column: 2;
  place-self: center;
`;

const PokemonCard = () => {
  let [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const searchValue = useRef();
  const [loading, setLoading] = useState(true);
  const { uid } = useContext(UserContext);
  // const userr = useContext(UserContext)

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
    const writeDataInFirebase = () => {
      const pokedexRef = firebase.database().ref("pokedex/" + uid);
      pokedexRef.set({
        pokedexData,
      });
      setLoading(false);
    };
    const getDataFromFirebase = () => {
      const pokedexData = firebase
        .database()
        .ref("pokedex/" + uid + "/pokedexData");
      pokedexData.limitToFirst(150).on("value", (snapshot) => {
        setData(snapshot.val());
        setPokemon(snapshot.val());
        console.log(snapshot.key);
      });
      setLoading(false);
    };
    if (loading && uid != null) {
      const pokedexRef = firebase.database().ref("pokedex/" + uid);
      pokedexRef.on("value", (snapshot) => {
        if (!snapshot.exists()) {
          writeDataInFirebase();
          getDataFromFirebase();
        } else {
          getDataFromFirebase();
        }
      });
    }
    return () => setLoading(false);
  }, [setData, loading, uid]);

  //#region Select pokemon from specific region
  const PokedexJohto = () => {
    setData((data = pokemon.filter((data) => data.id > 0 && data.id < 152)));
  };
  const PokedexKanto = () => {
    setData((data = pokemon.filter((data) => data.id > 151 && data.id < 252)));
  };
  const PokedexHoenn = () => {
    setData((data = pokemon.filter((data) => data.id > 251 && data.id < 386)));
  };
  const PokedexSinoh = () => {
    setData((data = pokemon.filter((data) => data.id > 386 && data.id < 493)));
  };
  const PokedexUnys = () => {
    setData((data = pokemon.filter((data) => data.id > 494 && data.id < 649)));
  };
  const PokedexKalos = () => {
    setData((data = pokemon.filter((data) => data.id > 649 && data.id < 721)));
  };
  const PokedexAlola = () => {
    setData((data = pokemon.filter((data) => data.id > 722 && data.id < 809)));
  };
  const PokedexGalar = () => {
    setData((data = pokemon.filter((data) => data.id > 809 && data.id < 897)));
  };
  const PokedexFav = () => {
    setData((data = pokemon.filter((data) => data.favorite === true)));
  };
  //#endregion

  // Search pokemon by name
  const searchPokemon = () => {
    setData(
      (data = pokemon.filter(
        (data) => data.french.toLowerCase() === searchValue.current.value
      ))
    );
  };

  // Display all pokemon when input is empty
  const resetData = () => {
    searchValue.current.value === ""
      ? setData((data = pokemon))
      : searchPokemon();
  };

  return (
    <>
      <ResearchContainer>
        <Research
          ref={searchValue}
          onChange={resetData}
          placeholder="Rechercher un pokémon"
        ></Research>
        <ResearchButton onClick={searchPokemon}>Capturer</ResearchButton>
      </ResearchContainer>
      <RegionContainer>
        <ButtonRegion onClick={PokedexJohto}>Johto</ButtonRegion>
        <ButtonRegion onClick={PokedexKanto}>Kanto</ButtonRegion>
        <ButtonRegion onClick={PokedexHoenn}>Hoenn</ButtonRegion>
        <ButtonRegion onClick={PokedexSinoh}>Sinoh</ButtonRegion>
        <ButtonRegion onClick={PokedexUnys}>Unys</ButtonRegion>
        <ButtonRegion onClick={PokedexKalos}>Kalos</ButtonRegion>
        <ButtonRegion onClick={PokedexAlola}>Alola</ButtonRegion>
        <ButtonRegion onClick={PokedexGalar}>Galar</ButtonRegion>
        <ButtonRegion onClick={PokedexFav}>Favori</ButtonRegion>
      </RegionContainer>
      {loading === true ? (
        <Loader></Loader>
      ) : (
        data.map((data) => <CardData data={data} key={data.id} />)
      )}
    </>
  );
};

export default PokemonCard;
