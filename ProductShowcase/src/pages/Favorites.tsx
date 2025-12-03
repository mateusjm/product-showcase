import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import type { PokemonList } from "@/types/pokemon";
import PokemonCard from "@/components/PokemonCard";
import pokemonService from "@/services/pokemonService";
import Loading from "@/components/Loading";

function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  const [pokemons, setPokemons] = useState<PokemonList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);

      if (favorites.length === 0) {
        setPokemons([]);
        setLoading(false);
        return;
      }

      const allPokemons = await pokemonService.getAll();
      const favoritePokemons = allPokemons.filter((p: PokemonList) =>
        favorites.includes(p.name)
      );

      setPokemons(favoritePokemons);
      setLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  return (
    <div className="flex flex-wrap justify-center p-3 gap-1">
      {loading ? (
        <Loading />
      ) : pokemons.length === 0 ? (
        <p>Nenhum Pokémon favoritado ainda.</p>
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))
      )}
    </div>
  );
}

export default Favorites;
