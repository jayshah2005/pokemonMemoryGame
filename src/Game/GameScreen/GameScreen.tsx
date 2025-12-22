import { useEffect, useState } from "react";
import { get20PokemonFromRegions, playCry, PokemonCard } from "../api/pokeapi";
import "./GameScreen.css";

export function GameScreen({ selectedRegions }: { selectedRegions: number[] }) {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await get20PokemonFromRegions(selectedRegions);

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
    <div>
      <h2>Loaded {cards.length} Pokémon</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {cards.map((c) => (
          <div key={c.id} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 10 }}>
            {c.sprite ? (
              <img src={c.sprite} alt={c.name} style={{ width: 90, height: 90 }} />
            ) : (
              <div style={{ width: 90, height: 90 }}>No sprite</div>
            )}

            <div style={{ marginTop: 6, fontWeight: 600 }}>{c.name}</div>

            <button style={{ marginTop: 8 }} onClick={() => playCry(c.cryUrl)}>
              Play cry
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
