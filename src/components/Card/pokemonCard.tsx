import { useContext } from "react";
import { ReactComponent as Pokeball } from "../../assets/pokeballnb.svg";
import firebase from "firebase";
import "firebase/firebase-database";
import styled from "styled-components";
import { UserContext } from "../../context/authentification";
import { PokemonAttribute } from "../../types";
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

type CardProps = {
  data: PokemonAttribute;
};

const CardData = ({ data }: CardProps) => {
  const id = (data.id - 1).toString();
  const { ...user } = useContext(UserContext);
  const uid = user.uid;

  const addPokemonToFavorite = () => {
    const pokedexData = firebase
      .database()
      .ref("users/" + uid + "/pokedexData");
    pokedexData.child(id).child("favorite").set(true);
    pokedexData
      .child(id)
      .child("favorite")
      .once("value", (snapshot) => {
        data.favorite = snapshot.val();
      });
  };

  const removePokemonFromTeam = () => {
    const pokedexData = firebase
      .database()
      .ref("users/" + uid + "/pokedexData");
    pokedexData.child(id).child("favorite").set(false);
    pokedexData
      .child(id)
      .child("favorite")
      .once("value", (snapshot) => {
        data.favorite = snapshot.val();
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

          {data.favorite === false ? (
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
