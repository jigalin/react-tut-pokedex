import React, { useEffect, useState } from "react";
import "./PokeDude.css";

const PokeDude = ({ individualPokemon }) => {
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

  const clickedFunc = () => {
    setShinyIsDisplayed(!shinyIsDisplayed);
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
      <button onClick={clickedFunc} className="shiny-button">
        {shinyIsDisplayed ? "HIDE SHINY" : "SHOW SHINY"}
      </button>
      <button
        onClick={favouriteFunc}
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
