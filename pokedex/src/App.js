import React, { useEffect, useState } from "react";
import PokeDude from "./components/PokeDude";
import "./App.css";
import logo from "./components/PokemonLogo.png";

function App() {
  const [cachedPokeBoys, setCachedPokeBoys] = useState([]);
  const [shownPokeBoys, setShownPokeBoys] = useState([]);
  const [pageRef, setPageRef] = useState(0);
  const [favPokeBoys, setFavPokeBoys] = useState([]);

  // Fetch some data with a given page reference (10 size for debugging)
  // Load response to .json format
  // Set CACHED pokeboys to the results
  // Set WORKING COPY / SHOWN pokeboys to what the cached copy currently is
  const pokeData = async () => {
    console.log("PokeData Called");
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pageRef * 10}&limit=10`
      );
      const pokeboys = await response.json();
      setCachedPokeBoys(pokeboys.results);
    } catch (error) {
      console.log(error);
    }
  };

  // On first load - log something
  // AND call pokeData function.
  useEffect(() => {
    console.log("UseEffect Triggered");
    pokeData();
  }, [pageRef]);

  useEffect(() => {
    setShownPokeBoys(cachedPokeBoys);
  }, [cachedPokeBoys]);

  // What happens as we type?
  // Convert to lowercase
  // Filter our STORED COPY of pokeboys
  // Filter based off NAME data
  // Set our WORKING COPY of pokeboys to the result
  // OTHERWISE - if we filter the cached copy, then as you delete your search
  const onSearchbarChange = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    result = cachedPokeBoys.filter((data) => {
      return data.name.search(value) !== -1;
    });
    setShownPokeBoys(result);
  };

  // Click BACK arrow to update the referenced page we're on
  const backBtn = (e) => {
    console.log("Current Page:" + pageRef);
    if (pageRef > 0) {
      setPageRef(pageRef - 1);
      pokeData();
    }
  };

  // Click NEXT arrow to update the referenced page we're on
  const nextBtn = (e) => {
    setPageRef(pageRef + 1);
    console.log("NextPage:", pageRef);
    pokeData();
  };

  const addPokeFav = () => {};

  return (
    <div className="homeWrapper">
      <div className="headerWrapper">
        <img src={logo} alt="Logo" className="header-logo" />
        <form className="search-pokemon">
          <label htmlFor="pokename">Page Search:</label>
          <input
            type="text"
            id="pokename"
            name="pokename"
            onChange={(e) => onSearchbarChange(e)}
          ></input>
        </form>
      </div>
      <div className="homepage-nav">
        <button onClick={backBtn} className="nav-button-back">
          &lt;&lt;
        </button>
        <button onClick={nextBtn} className="nav-button-forward">
          &gt;&gt;
        </button>
      </div>
      <h1>{pageRef}</h1>
      <div className="pokemon-container">
        {shownPokeBoys.map((individualPokemon) => {
          return (
            <PokeDude
              key={individualPokemon.name}
              individualPokemon={individualPokemon}
              addToFav={addPokeFav}
            />
          );
        })}
      </div>
      <div className="homepage-nav">
        <button onClick={backBtn} className="nav-button-back">
          &lt;&lt;
        </button>
        <button onClick={nextBtn} className="nav-button-forward">
          &gt;&gt;
        </button>
      </div>
      <div className="homepage-footer">
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>
    </div>
  );
}

export default App;
