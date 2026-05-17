import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface Props {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-none transition-all duration-200 ${
        isFavorite
          ? "bg-amber-50 text-amber-400 shadow-sm hover:scale-110 hover:bg-amber-100"
          : "bg-white/80 text-slate-300 shadow-sm backdrop-blur-sm hover:scale-110 hover:bg-white hover:text-amber-300"
      }`}
    >
      {isFavorite ? (
        <FaStar className="text-lg drop-shadow-sm" />
      ) : (
        <FiStar className="text-lg" />
      )}
    </button>
  );
}
