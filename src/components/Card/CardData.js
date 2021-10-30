import styled from "styled-components";
import { keyframes } from "styled-components";

const display = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

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
  animation-name: ${display};
  animation-duration: 1s;
  font-size: 12pt;
  font-weight: 400;
  width: 300px;
`;

const CardData = (props) => {
  const { data } = props;

  return (
    <>
      <CardPokemon>
        <div>
          <img src={data.thumbnail} alt="pokemon"></img>
        </div>
        <ul>
          <li>{data.french} </li>
          <li>
            Type : {data.type.primary}{" "}
            {data.type.secondary ? "et " + data.type.secondary : ""}
          </li>
        </ul>
        <Description>{data.description}</Description>
      </CardPokemon>
    </>
  );
};

export default CardData;
