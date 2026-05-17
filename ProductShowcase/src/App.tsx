import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home.tsx";
import PokemonDetails from "@/pages/Pokemon.tsx";
import Favorites from "@/pages/Favorites.tsx";
import Header from "@/components/Header.tsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="mt-auto border-t border-white/50 bg-white/40 py-6 text-center text-sm text-slate-500 backdrop-blur-sm">
        <p>
          Dados via{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--color-poke-blue)] hover:underline"
          >
            PokéAPI
          </a>
          {" · "}
          Feito com React & Tailwind
        </p>
      </footer>
    </div>
  );
}

export default App;
