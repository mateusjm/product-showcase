import type { ChangeEvent } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export default function PokemonFilter({
  filter,
  setFilter,
  resultCount,
  totalCount,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  return (
    <div className="w-full space-y-3">
      <div className="relative mx-auto w-full max-w-2xl">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400" />
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Buscar por nome do Pokémon..."
          className="search-input"
          aria-label="Buscar Pokémon"
        />
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Limpar busca"
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>

      {resultCount !== undefined && totalCount !== undefined && (
        <p className="text-center text-sm text-slate-500">
          {filter ? (
            <>
              <span className="font-semibold text-slate-700">{resultCount}</span>{" "}
              resultado{resultCount !== 1 ? "s" : ""} de{" "}
              <span className="font-semibold text-slate-700">{totalCount}</span>
            </>
          ) : (
            <>
              Exibindo{" "}
              <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
              Pokémon
            </>
          )}
        </p>
      )}
    </div>
  );
}
