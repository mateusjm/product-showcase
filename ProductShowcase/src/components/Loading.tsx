export default function Loading({
  message = "Carregando Pokémon...",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 py-16">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin-slow rounded-full border-4 border-slate-200 border-t-[var(--color-poke-red)]" />
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--color-poke-red)] to-[var(--color-poke-red-dark)] shadow-md" />
      </div>
      <p className="animate-pulse-soft text-base font-medium text-slate-600">{message}</p>
    </div>
  );
}
