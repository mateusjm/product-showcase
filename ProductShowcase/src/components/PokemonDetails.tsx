import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { formatPokemonId, getTypeStyle } from "@/utils/pokemonUtils";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
}

function TypeBadge({ type }: { type: string }) {
  const style = getTypeStyle(type);
  return (
    <span
      className="type-badge"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {type}
    </span>
  );
}

function StatRow({ label, value, max }: { label: string; value: number; max: number }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill bg-gradient-to-r from-[var(--color-poke-blue)] to-[var(--color-poke-red)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-12 shrink-0 text-right text-sm font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}

export default function PokemonDetails({
  id,
  name,
  imageUrl,
  types,
  height,
  weight,
}: Props) {
  const primaryType = types[0] ?? "normal";
  const accent = getTypeStyle(primaryType);

  return (
    <div className="page-container">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-poke-red)]"
      >
        <HiOutlineArrowLeft className="text-lg" />
        Voltar à lista
      </Link>

      <div className="glass-card overflow-hidden">
        <div
          className="relative px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-12"
          style={{
            background: `linear-gradient(180deg, ${accent.light} 0%, rgba(255,255,255,0.9) 100%)`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div
              className="absolute -left-10 -top-10 h-40 w-40 rounded-full"
              style={{ backgroundColor: accent.bg }}
            />
            <div
              className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full"
              style={{ backgroundColor: accent.bg }}
            />
          </div>

          <span className="relative font-mono text-sm font-bold text-slate-400">
            {formatPokemonId(id)}
          </span>
          <h1 className="font-display relative m-0 mt-1 text-4xl font-extrabold capitalize tracking-tight text-slate-900 sm:text-5xl">
            {name}
          </h1>

          <div className="relative mt-4 flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>

          <div className="relative mx-auto mt-6 flex max-w-xs justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="animate-float h-52 w-52 object-contain drop-shadow-2xl sm:h-64 sm:w-64"
            />
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-100 p-6 sm:grid-cols-2 sm:p-8">
          <section className="rounded-xl bg-slate-50/80 p-5">
            <h2 className="font-display m-0 mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Medidas
            </h2>
            <dl className="m-0 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                <dt className="text-xs font-medium uppercase text-slate-400">Altura</dt>
                <dd className="m-0 mt-1 text-2xl font-bold text-slate-800">
                  {height}
                  <span className="ml-0.5 text-sm font-normal text-slate-500">m</span>
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                <dt className="text-xs font-medium uppercase text-slate-400">Peso</dt>
                <dd className="m-0 mt-1 text-2xl font-bold text-slate-800">
                  {weight}
                  <span className="ml-0.5 text-sm font-normal text-slate-500">kg</span>
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl bg-slate-50/80 p-5">
            <h2 className="font-display m-0 mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Comparativo
            </h2>
            <div className="space-y-3">
              <StatRow label="Altura" value={Math.round(height * 10)} max={30} />
              <StatRow label="Peso" value={Math.round(weight * 10)} max={1000} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
