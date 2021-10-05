import { useEffect, useState } from "react";
import CardData from "./CardData";

const PokemonCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://app.pokemon-api.xyz/pokemon/all");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      {data.map((data) => (
        <CardData data={data} key={data.id} />
      ))}
    </>
  );
};

export default PokemonCard;
