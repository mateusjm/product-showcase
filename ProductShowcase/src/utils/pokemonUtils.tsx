import type { PokemonItem } from "@/types/pokemon";

const baseUrl = import.meta.env.VITE_IMAGE_URL;

export function getPokemonId(url: string): number {
  const id = url.split("/").filter(Boolean).pop();
  return Number(id);
}

export function getPokemonImage(id: number): string {
  return `${baseUrl}/${id}.png`;
}

export function getPokemonTypes(pokemon: PokemonItem): string {
  return pokemon.types.map((t) => t.type.name).join(", ");
}
