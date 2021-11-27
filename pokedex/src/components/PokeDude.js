import React, { useEffect, useState } from "react";
import "./PokeDude.css";

const PokeDude = ({ individualPokemon, addToFav }) => {
  const [furtherPokeInfo, setfurtherPokeInfo] = useState();
  const [shinyIsDisplayed, setShinyIsDisplayed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const getPokeData = () => {
    fetch(individualPokemon.url)
      .then((response) => response.json())
      .then((data) => setfurtherPokeInfo(data));
  };

  useEffect(() => {
    if (!individualPokemon) return;
    getPokeData();
  }, []);

  const showShiny = () => {
    setShinyIsDisplayed(!shinyIsDisplayed);
    console.log(individualPokemon.url);
  };

  const favouriteFunc = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="pokeDude">
      <p className="pokemon-name">{individualPokemon.name}</p>
      {furtherPokeInfo && (
        <img
          className="pokemon-image"
          alt=""
          src={
            shinyIsDisplayed
              ? furtherPokeInfo.sprites.front_shiny
              : furtherPokeInfo.sprites.front_default
          }
        />
      )}
      <button onClick={showShiny} className="shiny-button">
        {shinyIsDisplayed ? "HIDE SHINY" : "SHOW SHINY"}
      </button>
      <button
        onClick={() => addToFav(furtherPokeInfo)}
        className={
          isFavourite ? "favourite-button-clicked" : "favourite-button-default"
        }
      >
        {isFavourite ? "FAVOURITED" : "FAVOURITE"}
      </button>
    </div>
  );
};

export default PokeDude;
