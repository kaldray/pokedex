import styled from "styled-components";
import { keyframes } from "styled-components";
import { useState } from "react";

const rotate = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const DataPokemon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1em;
`;

const ShowDescription = styled.span`
  animation-name: ${rotate};
  animation-duration: 1s;
  font-size: 0.8em;
`;

const CardData = (props) => {
  const [hover, setHover] = useState({ display: "none" });

  const { data } = props;

  return (
    <>
      <DataPokemon
        onMouseEnter={(e) => {
          setHover({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setHover({ display: "none" });
        }}
      >
        <div>
          <img src={data.thumbnail} alt="pokemon"></img>
        </div>
        <ul>
          <li>{data.name.french}</li>
          <li>
            Type : {data.type[0]} {data.type[1] ? "and " + data.type[1] : ""}
          </li>
          <li></li>
        </ul>
        <ShowDescription style={hover}>{data.description}</ShowDescription>
      </DataPokemon>
    </>
  );
};

export default CardData;
