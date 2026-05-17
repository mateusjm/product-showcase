import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
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
    <div className="page-container">
      <section className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 text-2xl text-[var(--color-poke-red)] shadow-sm">
          <HiOutlineHeart />
        </div>
        <h2 className="font-display m-0 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Meus Favoritos
        </h2>
        <p className="m-0 mt-2 text-slate-500">
          {favorites.length === 0
            ? "Você ainda não favoritou nenhum Pokémon."
            : `${favorites.length} Pokémon${favorites.length !== 1 ? "s" : ""} salvo${favorites.length !== 1 ? "s" : ""}`}
        </p>
      </section>

      {loading ? (
        <Loading message="Carregando favoritos..." />
      ) : pokemons.length === 0 ? (
        <div className="glass-card mx-auto max-w-md p-10 text-center">
          <p className="m-0 text-5xl">⭐</p>
          <p className="font-display m-0 mt-4 text-lg font-bold text-slate-800">
            Lista vazia por enquanto
          </p>
          <p className="m-0 mt-2 text-sm text-slate-500">
            Toque na estrela de um Pokémon na página inicial para adicioná-lo
            aqui.
          </p>
          <Link to="/" className="btn-primary mt-6 inline-flex">
            Explorar Pokémon
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
