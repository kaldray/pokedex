import { useContext, useEffect, useState } from "react";
import { ReactComponent as Pokeball } from "../../assets/pokeballnb.svg";
import firebase from "firebase";
import "firebase/firebase-database";
import styled from "styled-components";
import { UserContext } from "../../context/authentification";

const CardPokemon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  @media screen and (max-width: 768px) {
    margin-bottom: 50px;
    width: 100vw;
  }
  li {
    margin-bottom: 10px;
  }
`;

const Description = styled.span`
  font-size: 12pt;
  font-weight: 400;
  width: 300px;
  margin-bottom: 30px;
`;

const PokeballNoFav = styled(Pokeball)`
  :hover {
    cursor: pointer;
  }
`;

const PokeballFav = styled(PokeballNoFav)`
  #top {
    fill: #ffbb44;
  }
`;

const CardData = (props) => {
  const { data } = props;
  const [favori, setFavori] = useState([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    // get the favorites value for all data
    const getFavoriDataFromFirebase = () => {
      const pokedexData = firebase
        .database()
        .ref("pokedex/" + uid + "/pokedexData");
      pokedexData
        .child(data.id - 1)
        .child("favorite")
        .get()
        .then((snapshot) => {
          data.favorite = snapshot.val();
        });
    };
    getFavoriDataFromFirebase();
    return () => getFavoriDataFromFirebase();
  }, [data.favorite, data.id, uid, data]);

  const addPokemonToFavorite = () => {
    const pokedexData = firebase
      .database()
      .ref("pokedex/" + uid + "/pokedexData");
    pokedexData
      .child(data.id - 1)
      .child("favorite")
      .set(true);
    pokedexData
      .child(data.id - 1)
      .child("favorite")
      .once("value", (snapshot) => {
        props.data.favorite = snapshot.val();
        setFavori(snapshot.val());
      });
  };

  const removePokemonFromTeam = () => {
    const pokedexData = firebase
      .database()
      .ref("pokedex/" + uid + "/pokedexData");
    pokedexData
      .child(data.id - 1)
      .child("favorite")
      .set(false);
    pokedexData
      .child(data.id - 1)
      .child("favorite")
      .once("value", (snapshot) => {
        props.data.favorite = snapshot.val();
        setFavori(snapshot.val());
      });
  };

  return (
    <>
      <CardPokemon>
        <div>
          <img
            width="100px"
            height="100px"
            src={data.thumbnail}
            alt={data.french}
          ></img>
        </div>
        <ul>
          <li>{data.french}</li>
          <li>
            Type : {data.type.primary}{" "}
            {data.type.secondary ? "et " + data.type.secondary : ""}
          </li>

          {props.data.favorite === false ? (
            <>
              <PokeballNoFav onClick={() => addPokemonToFavorite()} />
            </>
          ) : (
            <>
              <PokeballFav onClick={() => removePokemonFromTeam()} />
            </>
          )}
        </ul>
        <Description>{data.description}</Description>
      </CardPokemon>
    </>
  );
};

export default CardData;
