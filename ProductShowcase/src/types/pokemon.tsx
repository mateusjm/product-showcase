export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonItem {
  id: number; 
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}
