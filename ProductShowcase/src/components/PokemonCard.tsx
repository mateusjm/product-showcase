import type { PokemonList } from "../types/pokemon";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import FavoriteButton from "@/components/FavoriteButton";
import {
  formatPokemonId,
  getPokemonId,
  getPokemonImage,
} from "@/utils/pokemonUtils";

interface Props {
  pokemon: PokemonList;
}

function PokemonCard({ pokemon }: Props) {
  const id = getPokemonId(pokemon.url);
  const imageUrl = getPokemonImage(id);

  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const isFavorite = favorites.includes(pokemon.name);

  return (
    <article
      className="group relative w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10 sm:max-w-[240px]"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100/80 to-red-100/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(pokemon.name);
        }}
      />

      <Link
        to={`/pokemon/${pokemon.name}`}
        className="relative flex flex-col items-center px-4 pb-5 pt-6"
      >
        <span className="absolute left-3 top-3 font-mono text-xs font-bold text-slate-400">
          {formatPokemonId(id)}
        </span>

        <div className="mb-2 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-slate-50 to-blue-50/80 p-2 transition-transform duration-300 group-hover:scale-105">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <h2 className="font-display m-0 text-center text-lg font-bold capitalize text-slate-800">
          {pokemon.name}
        </h2>

        <span className="mt-2 text-xs font-medium text-[var(--color-poke-blue)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Ver detalhes →
        </span>
      </Link>
    </article>
  );
}

export default PokemonCard;
