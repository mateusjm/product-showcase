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
    <div className="page-container">
      <section className="mb-10 text-center">
        <p className="m-0 text-sm font-semibold uppercase tracking-widest text-[var(--color-poke-red)]">
          Bem-vindo à
        </p>
        <h2 className="font-display m-0 mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Explore a{" "}
          <span className="text-gradient-pokemon">Pokédex</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-slate-500">
          Descubra Pokémon, veja detalhes completos e salve seus favoritos para
          acessar depois.
        </p>
      </section>

      <PokemonFilter
        filter={filter}
        setFilter={setFilter}
        resultCount={filteredPokemons.length}
        totalCount={pokemons.length}
      />

      {filteredPokemons.length === 0 ? (
        <div className="glass-card mx-auto mt-10 max-w-md p-10 text-center">
          <p className="m-0 text-4xl">🔍</p>
          <p className="font-display m-0 mt-3 text-lg font-bold text-slate-800">
            Nenhum Pokémon encontrado
          </p>
          <p className="m-0 mt-2 text-sm text-slate-500">
            Tente outro nome na busca.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
