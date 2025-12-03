import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface Props {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-2 right-2 text-[2rem] cursor-pointer bg-transparent border-none"
    >
      {isFavorite ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FiStar className="text-gray-200" />
      )}
    </button>
  );
}
