import { useEffect, useState, useRef, useContext } from "react";
import CardData from "./pokemonCard";
import firebase from "firebase";
import "firebase/firebase-database";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../context/authentification";
import { pokedexData } from "../../data/pokedexData";
import { PokemonAttributes } from "../../types";

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
  text-align: center;
  vertical-align: center;
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
  @media screen and (max-width: 768px) {
    grid-row: 3;
    place-self: center;
    grid-column: 1;
  }
`;

const PokemonCard = () => {
  let [data, setData] = useState<PokemonAttributes>([]);
  const [pokemon, setPokemon] = useState<PokemonAttributes>([]);
  const searchValue = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const { ...user } = useContext(UserContext);

  const uid = user.uid;

  const writeDataInFirebase = () => {
    const pokedexRef = firebase.database().ref("users/" + uid);
    pokedexRef.set({
      pokedexData,
    });
    setLoading(false);
  };
  const getDataFromFirebase = () => {
    const refPokedexData = firebase
      .database()
      .ref("users/" + uid + "/pokedexData");
    refPokedexData.limitToFirst(897).on("value", (snapshot) => {
      setData(snapshot.val());
      setPokemon(snapshot.val());
      setLoading(false);
    });
  };

  //Get data from firebase
  useEffect(() => {
    if (loading && uid != null) {
      const pokedexRef = firebase.database().ref("users/" + uid);
      pokedexRef.on("value", (snapshot) => {
        if (!snapshot.exists()) {
          writeDataInFirebase();
          getDataFromFirebase();
        } else {
          getDataFromFirebase();
        }
      });
    }
  }, [setData, loading, uid]);

  //#region Select pokemon from specific region
  const PokedexJohto = () => {
    setData(pokemon.filter((data) => data.id > 0 && data.id < 152));
  };
  const PokedexKanto = () => {
    setData(pokemon.filter((data) => data.id > 151 && data.id < 252));
  };
  const PokedexHoenn = () => {
    setData(pokemon.filter((data) => data.id > 251 && data.id < 386));
  };
  const PokedexSinoh = () => {
    setData(pokemon.filter((data) => data.id > 386 && data.id < 493));
  };
  const PokedexUnys = () => {
    setData(pokemon.filter((data) => data.id > 494 && data.id < 649));
  };
  const PokedexKalos = () => {
    setData(pokemon.filter((data) => data.id > 649 && data.id < 721));
  };
  const PokedexAlola = () => {
    setData(pokemon.filter((data) => data.id > 722 && data.id < 809));
  };
  const PokedexGalar = () => {
    setData(pokemon.filter((data) => data.id > 809 && data.id < 897));
  };
  const PokedexFav = () => {
    setData(pokemon.filter((data) => data.favorite === true));
  };
  //#endregion

  // Search pokemon by name
  const searchPokemon = () => {
    setData(
      pokemon.filter((pokemon) => {
        if (searchValue.current !== null) {
          return pokemon.french
            .toLowerCase()
            .includes(searchValue.current.value);
        }
      })
    );
  };

  return (
    <>
      <ResearchContainer>
        <Research
          ref={searchValue}
          onChange={searchPokemon}
          placeholder="Rechercher un pok??mon"
        />
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
        <Loader />
      ) : (
        data.map((data) => <CardData data={data} key={data.id} />)
      )}
    </>
  );
};

export default PokemonCard;
