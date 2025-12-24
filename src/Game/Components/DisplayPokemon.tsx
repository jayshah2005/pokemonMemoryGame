import { playCry } from "../api/pokeapi";
import Tilt from "react-parallax-tilt";
import { GameStaus } from "../../global";
import { useState } from "react";

export function DisplayPokemon({ pokemon, setPokemon, selectedPokemon, setSelectedPokemon, gameStatus, setGameStatus }: { pokemon: any; setPokemon : any, selectedPokemon: any; setSelectedPokemon: any, gameStatus: any; setGameStatus: any }) {

  // let numberOfPokemonToDisplay = 8;
  // let unSelectedPokemon = [...pokemon];
  // let [displayPokemon, setDisplayPokemon] = useState([...pokemon.slice(0, numberOfPokemonToDisplay)]);

  if (selectedPokemon.length === pokemon.length) {
      setGameStatus(GameStaus.WON);
  }

  return (

    <div id="pokemon-grid">
        {pokemon.map((c) => (
          <Tilt
          tiltReverse
          reset={true}
          glareEnable={pokemon.shiny ? true : false}
          glareMaxOpacity={0.4}
          glareColor={pokemon.shiny ? "#f1b818" : "#fff"}
          glarePosition="all"
          key={c.id + Math.random()}
          >
            <div onClick={(e) => handlePokemonClick(e, c)}>
            
            {c.sprite ? (
              <img src={c.sprite} alt={c.name} className="pokemon-img" />
            ) : (
              <div style={{ width: 90, height: 90 }}>No sprite</div>
            )}

            <div style={{ marginTop: 6, fontWeight: 600 }}>{c.name}</div>

            </div>
          </Tilt>
        ))}
    </div>
  );

  function handlePokemonClick(event: React.MouseEvent, currPokemon: any) {

    if(gameStatus !== GameStaus.NOT_DETERMINED) return;

    if(selectedPokemon.includes(currPokemon)){
      setGameStatus(GameStaus.LOST);
    }

    setSelectedPokemon([...selectedPokemon, currPokemon]);

    playCry(currPokemon.cryUrl);

    setPokemon([...shuffle(pokemon)]);

    // unSelectedPokemon = pokemon.filter((p) => p.id !== currPokemon.id)
    // let newSelectedPokemon = [...selectedPokemon, currPokemon];

    // setSelectedPokemon(newSelectedPokemon);

    // let newPokemon = [...newSelectedPokemon];


    // if (newPokemon.length >= numberOfPokemonToDisplay) {
    //   newPokemon = newPokemon.slice(0, numberOfPokemonToDisplay - 2);
    //   let rand = Math.floor(Math.random() * unSelectedPokemon.length);
    //   newPokemon.push(unSelectedPokemon[rand], unSelectedPokemon[rand + 1]);
    // }

    // newPokemon.push(...unSelectedPokemon.splice(0, numberOfPokemonToDisplay - newPokemon.length));
    
    // setDisplayPokemon([...shuffle(Array.from(newPokemon))]);
  }

  function shuffle(array) {

    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {
      // Generate Random Index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }

    console.log(array)
	  return array;
  }
}