import { createContext, useState, useEffect, useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

interface FavoriteContextProps {
  favorites: string[];
  toggleFavorite: (name: string) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
  favorites: [],
  toggleFavorite: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  function toggleFavorite(name: string) {
    setFavorites((prev) => {
      if (prev.includes(name)) {
        const updated = prev.filter((f) => f !== name);
        localStorage.setItem("favorites", JSON.stringify(updated));
        showToast("Pokémon removido dos favoritos!", "info");
        return updated;
      }

      if (prev.length >= 6) {
        showToast("Você só pode ter até 6 favoritos!", "error");
        return prev;
      }

      const updated = [...prev, name];
      localStorage.setItem("favorites", JSON.stringify(updated));
      showToast("Adicionado aos favoritos!", "success");
      return updated;
    });
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
