import React, { useEffect, useState } from "react";
import PokeDude from "./components/PokeDude";
import "./App.css";
import logo from "./components/PokemonLogo.png";

function App() {
  const [cachedPokeBoys, setCachedPokeBoys] = useState([]);
  const [shownPokeBoys, setShownPokeBoys] = useState([]);
  //   const [searchInput, setSearchInput] = useState("");

  const pokeData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
      .then((response) => response.json())
      .then((data) => setCachedPokeBoys(data.results));
    setShownPokeBoys(cachedPokeBoys);
  };

  useEffect(() => {
    pokeData();
  }, []);

  const onSearchbarChange = (e) => {
    //   setSearchInput(e.target.value);
    // setStoredPokeBoys(storedPokeBoys);

    let value = e.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = cachedPokeBoys.filter((data) => {
      return data.name.search(value) != -1;
    });
    setShownPokeBoys(result);
  };

  return (
    <div className="homeWrapper">
      <div className="headerWrapper">
        <img src={logo} alt="Logo" className="header-logo" />
        <form className="search-pokemon">
          <label for="pokename">Pokemon Search:</label>
          <input
            type="text"
            id="pokename"
            name="pokename"
            onChange={(e) => onSearchbarChange(e)}
          ></input>
        </form>
      </div>
      <div className="pokemon-container">
        {shownPokeBoys.map((individualPokemon) => {
          return (
            <PokeDude
              key={individualPokemon.name}
              individualPokemon={individualPokemon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
