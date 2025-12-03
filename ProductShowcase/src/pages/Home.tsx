import { useState, useEffect, useMemo } from "react";
import pokemonService from "@/services/pokemonService";
import type { PokemonList } from "@/types/pokemon";
import PokemonCard from "@/components/PokemonCard";
import PokemonFilter from "@/components/PokemonFilter";
import Loading from "@/components/Loading.tsx";

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<PokemonList[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function loadPokemons() {
      const data = await pokemonService.getAll();
      setPokemons(data);
      setLoading(false);
    }

    loadPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [pokemons, filter]);

  if (loading) return <Loading />;

  return (
    <div className="p-3">
      <PokemonFilter filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap justify-center gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Home;
