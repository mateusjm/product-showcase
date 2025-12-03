import type { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
}

export default function PokemonFilter({ filter, setFilter }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  return (
    <div className="w-full flex justify-center my-5">
      <div className="relative w-full max-w-xl">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Digite o nome do Pokémon..."
          className="w-full pl-10 pr-3 py-2 border border-blue-600 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
