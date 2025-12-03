import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 h-20 flex items-center justify-between px-6 text-white">
      <h1 className="text-2xl font-bold m-0">Pokédex</h1>
      <nav>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link to="/favoritos" className="hover:underline">
          Favoritos
        </Link>
      </nav>
    </header>
  );
}

export default Header;
