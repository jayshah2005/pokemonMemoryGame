const BASE = "https://pokeapi.co/api/v2";

/* Generic fetch helper */
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status}: ${url}`);
    }
  return res.json() as Promise<T>;
}

/* Minimal subset types */
type Region = {
  id: number;
  name: string;
  pokedexes: { url: string }[];
};

type Pokedex = {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: { name: string; url: string };
  }[];
};

type Pokemon = {
  id: number;
  name: string;
  sprites?: {
    other?: {
      dream_world?: { front_default?: string | null };
      ["official-artwork"]?: { front_default?: string | null };
    };
    front_default?: string | null;
  };
  cries?: {
    latest?: string | null;
    legacy?: string | null;
  };
};

/** Output “card” you’ll use in your memory game */
export type PokemonCard = {
  id: number;
  name: string;
  sprite: string | null;
  cryUrl: string | null;
};

/** API calls */
export async function getRegion(regionId: number) {
  return fetchJSON<Region>(`${BASE}/region/${regionId}/`);
}

export async function getPokedexByUrl(url: string) {
  return fetchJSON<Pokedex>(url);
}

export async function getPokemon(idOrName: number | string) {
  return fetchJSON<Pokemon>(`${BASE}/pokemon/${idOrName}/`);
}

/** Cry fallback (PokéAPI cry field is preferred when present) */
function showdownCryUrl(name: string) {
  // Works for most names; you can add special cases later if needed.
  return `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`;
}

/** Sprite selection (your desired sprite first, then fallbacks) */
function pickSprite(p: Pokemon): string | null {
  const dream = p.sprites?.other?.dream_world?.front_default ?? null;
  const artwork = p.sprites?.other?.["official-artwork"]?.front_default ?? null;
  const front = p.sprites?.front_default ?? null;
  return dream || artwork || front;
}

/** Cry selection */
function pickCryUrl(p: Pokemon): string | null {
  return p.cries?.latest || p.cries?.legacy || showdownCryUrl(p.name);
}

/** Utility: shuffle + take */
function sample<T>(arr: T[], n: number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/**
 * MAIN FUNCTION YOU ASKED FOR:
 * Returns exactly 20 Pokémon total, selected from ALL chosen regions combined.
 *
 * Steps:
 * 1) For each selected region -> fetch region -> take region.pokedexes[0].url
 * 2) Fetch each pokedex -> collect all species names
 * 3) Deduplicate names across regions
 * 4) Randomly sample 20 names
 * 5) Fetch /pokemon/{name} for those 20 -> map to PokemonCard (sprite + cry)
 */
export async function getPokemonFromRegions(regionIds: number[], numPokemon: number): Promise<PokemonCard[]> {

  if (!regionIds.length) return [];

  // 1) Get regions, extract first pokedex url per region
  const regions = await Promise.all(regionIds.map(getRegion));
  const pokedexUrls = regions
    .map((r) => r.pokedexes?.[0]?.url)
    .filter(Boolean) as string[];

  // 2) Fetch pokedexes, collect species names
  const pokedexes = await Promise.all(pokedexUrls.map(getPokedexByUrl));

  const allNames: string[] = [];
  for (const pd of pokedexes) {
    for (const entry of pd.pokemon_entries) {
      allNames.push(entry.pokemon_species.name);
    }
  }

  // 3) Deduplicate across regions
  const uniqueNames = Array.from(new Set(allNames));

  // If user picked tiny regions / edge cases, take min(20, total)
  const pickedNames = sample(uniqueNames, Math.min(numPokemon, uniqueNames.length));

  // 4) Fetch the 20 Pokémon details
  const pokemonList = await fetchUntilCount(uniqueNames, numPokemon);

  // 5) Map to what your UI needs
  return pokemonList.map((p) => ({
    id: p.id,
    name: p.name,
    sprite: pickSprite(p),
    cryUrl: pickCryUrl(p),
  }));
}

async function fetchUntilCount(
  names: string[],
  targetCount: number,
  batchSize = 10
) {
  const results = [];
  const shuffled = sample(names, names.length);

  for (let i = 0; i < shuffled.length && results.length < targetCount; i += batchSize) {
    const batch = shuffled.slice(i, i + batchSize);

    const settled = await Promise.allSettled(
      batch.map((name) => getPokemon(name))
    );

    for (const r of settled) {
      if (r.status === "fulfilled") {
        results.push(r.value);
        if (results.length >= targetCount) break;
      }
    }
  }

  return results;
}


/** Simple helper to play cry sound */
export function playCry(url: string | null) {
  if (!url) return;
  const audio = new Audio(url);
  audio.volume = 0.6;
  audio.play().catch(() => {
    // Some browsers require a user gesture; handle silently
  });
}