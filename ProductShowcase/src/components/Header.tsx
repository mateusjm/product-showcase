import { Link, useLocation } from "react-router-dom";
import { HiOutlineHeart, HiOutlineHome } from "react-icons/hi";

function Header() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[var(--color-poke-red)] via-[#d41c1c] to-[var(--color-poke-red-dark)] shadow-lg shadow-red-900/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-black text-[var(--color-poke-yellow)] shadow-inner backdrop-blur-sm transition-transform group-hover:scale-105">
            P
          </span>
          <div>
            <h1 className="font-display m-0 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Pokédex
            </h1>
            <p className="m-0 hidden text-xs text-white/70 sm:block">
              Gotta catch &apos;em all
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`nav-link flex items-center gap-1.5 ${isActive("/") && location.pathname === "/" ? "nav-link-active" : ""}`}
          >
            <HiOutlineHome className="text-lg" />
            <span className="hidden sm:inline">Início</span>
          </Link>
          <Link
            to="/favoritos"
            className={`nav-link flex items-center gap-1.5 ${isActive("/favoritos") ? "nav-link-active" : ""}`}
          >
            <HiOutlineHeart className="text-lg" />
            <span className="hidden sm:inline">Favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
