import { playCry } from "../api/pokeapi";
import Tilt from "react-parallax-tilt";
import { GameStaus } from "../../global";

export function DisplayPokemon({ pokemon, setPokemon, selectedPokemon, setSelectedPokemon, gameStatus, setGameStatus }: { pokemon: any; setPokemon : any, selectedPokemon: any; setSelectedPokemon: any, gameStatus: any; setGameStatus: any }) {

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

    playCry(currPokemon.cryUrl);

    if(selectedPokemon.includes(currPokemon.id)){
      setGameStatus(GameStaus.LOST);
    }

    setSelectedPokemon([...selectedPokemon, currPokemon.id]);
    setPokemon([...shuffle(pokemon)]);
  }

  function shuffle(array) {
    
    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {
      // Generate Random Index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
      }
	  return array;
  }

}