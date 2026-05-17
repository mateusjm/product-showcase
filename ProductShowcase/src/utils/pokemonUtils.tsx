import type { PokemonItem } from "@/types/pokemon";

const baseUrl = import.meta.env.VITE_IMAGE_URL;

export const TYPE_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  normal: { bg: "#A8A878", text: "#fff", light: "#f5f5f0" },
  fire: { bg: "#F08030", text: "#fff", light: "#fff5eb" },
  water: { bg: "#6890F0", text: "#fff", light: "#eef4ff" },
  electric: { bg: "#F8D030", text: "#1a1a2e", light: "#fffbeb" },
  grass: { bg: "#78C850", text: "#fff", light: "#f0fdf4" },
  ice: { bg: "#98D8D8", text: "#1a1a2e", light: "#f0fdfa" },
  fighting: { bg: "#C03028", text: "#fff", light: "#fef2f2" },
  poison: { bg: "#A040A0", text: "#fff", light: "#faf5ff" },
  ground: { bg: "#E0C068", text: "#1a1a2e", light: "#fffbeb" },
  flying: { bg: "#A890F0", text: "#fff", light: "#f5f3ff" },
  psychic: { bg: "#F85888", text: "#fff", light: "#fdf2f8" },
  bug: { bg: "#A8B820", text: "#fff", light: "#f7fee7" },
  rock: { bg: "#B8A038", text: "#fff", light: "#fefce8" },
  ghost: { bg: "#705898", text: "#fff", light: "#f5f3ff" },
  dragon: { bg: "#7038F8", text: "#fff", light: "#f5f3ff" },
  dark: { bg: "#705848", text: "#fff", light: "#fafaf9" },
  steel: { bg: "#B8B8D0", text: "#1a1a2e", light: "#f8fafc" },
  fairy: { bg: "#EE99AC", text: "#1a1a2e", light: "#fdf2f8" },
};

export function getPokemonId(url: string): number {
  const id = url.split("/").filter(Boolean).pop();
  return Number(id);
}

export function getPokemonImage(id: number): string {
  return `${baseUrl}/${id}.png`;
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

export function getPokemonTypes(pokemon: PokemonItem): string[] {
  return pokemon.types.map((t) => t.type.name);
}

export function getPokemonTypesLabel(pokemon: PokemonItem): string {
  return getPokemonTypes(pokemon).join(", ");
}

export function getTypeStyle(typeName: string) {
  return TYPE_COLORS[typeName] ?? TYPE_COLORS.normal;
}
