import { useEffect, useState } from "react";
import { GameStaus } from "../../global";
import { getPokemonFromRegions, PokemonCard } from "../api/pokeapi";
import { DisplayPokemon } from "../Components/DisplayPokemon";
import "./GameScreen.css";

export function GameScreen({ selectedRegions, gameStatus, setGameStatus }: { selectedRegions: number[]; gameStatus: any; setGameStatus: any }) {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPokemonFromRegions([1], 10);

        if (!cancelled) setCards(result);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load Pokémon.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedRegions]);

  if (loading) return (
    <div className="loading">
      <img src="https://i.imgur.com/MkhYjXB.gif" alt="" />
      <h1 className="loader"></h1>
    </div>
  );

  if (error) 
    return (
      <div className="error">
        <h1>Error: Please reload the page and start over</h1>
        <img src="https://media.tenor.com/b5_GZ8tV6oEAAAAi/pikachu-pokemon.gif" alt="" />
      </div>
    );
  
  return (
    <div id="game-screen">
        <header>
          <div className="left box">
            <h1>Catch 'em all</h1>
            <p>Pick a Pokémon</p>
          </div>
          <div className="right box">
            <h1>{selectedPokemon.length}</h1>
            <p>Pokémon Caught</p>
          </div>
        </header>

      <DisplayPokemon pokemon={cards} setPokemon={setCards} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} gameStatus={gameStatus} setGameStatus={setGameStatus}></DisplayPokemon>
    </div>
  );
}
