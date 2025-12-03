export default function Loading({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <div className="text-center mt-12 text-lg font-semibold">{message}</div>
  );
}
