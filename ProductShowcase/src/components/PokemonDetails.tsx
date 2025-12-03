interface Props {
  name: string;
  imageUrl: string;
  types: string;
  height: number;
  weight: number;
}

export default function PokemonDetails({
  name,
  imageUrl,
  types,
  height,
  weight,
}: Props) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg mt-6 text-center">
      <h1 className="text-5xl font-bold capitalize mb-4 text-blue-600">
        {name}
      </h1>
      <img src={imageUrl} alt={name} className="w-48 w-300 mx-auto mb-5" />
      <p className="text-xl">
        <strong className="text-blue-600">Tipos:</strong> {types}
      </p>
      <p className="text-xl">
        <strong className="text-blue-600">Altura:</strong> {height} m
      </p>
      <p className="text-xl">
        <strong className="text-blue-600">Peso:</strong> {weight} kg
      </p>
    </div>
  );
}
