import { Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/Home.tsx";
import PokemonDetails from "@/pages/Pokemon.tsx";
import Favorites from "@/pages/Favorites.tsx";

//components
import Header from "@/components/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
