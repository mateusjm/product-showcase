import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PokemonItem } from "@/types/pokemon";
import pokemonService from "@/services/pokemonService";
import PokemonDetails from "@/components/PokemonDetails";
import { getPokemonImage, getPokemonTypes } from "@/utils/pokemonUtils";
import Loading from "@/components/Loading";

function Pokemon() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonItem | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadPokemon() {
      const data = await pokemonService.getById(id as string);
      setPokemon(data);
    }

    loadPokemon();
  }, [id]);

  if (!pokemon) return <Loading />;

  return (
    <PokemonDetails
      name={pokemon.name}
      imageUrl={getPokemonImage(pokemon.id)}
      types={getPokemonTypes(pokemon)}
      height={pokemon.height / 10}
      weight={pokemon.weight / 10}
    />
  );
}

export default Pokemon;
