import type { PokemonList } from "../types/pokemon";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import FavoriteButton from "@/components/FavoriteButton";
import {
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
    <div
      className="relative w-[425px] h-[350px] rounded-xl bg-white 
      flex flex-col items-center p-4 m-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer"
    >
      <Link
        to={`/pokemon/${pokemon.name}`}
        className="flex flex-col items-center"
      >
        <img src={imageUrl} alt={pokemon.name} className="w-[250px]" />
        <p className="mt-3 text-lg capitalize font-semibold text-blue-600">
          {pokemon.name}
        </p>
      </Link>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon.name);
        }}
      />
    </div>
  );
}

export default PokemonCard;
