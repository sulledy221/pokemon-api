import "./App.css";
import { useState, useEffect } from "react";
import Thumbnails from "./components/Thumbnails";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);

    const createPokemonObject = (result) => {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemon((currentList) => [...currentList, data]);
      });
      console.log("What is the result --", result);
    };

    createPokemonObject(data.results);
    await console.log(allPokemon);
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemon.map((pokemon, index) => (
            <Thumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemon()}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
