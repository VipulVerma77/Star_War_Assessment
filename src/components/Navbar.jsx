import { Menu, X } from "lucide-react";
import { useState } from "react";
import AuthButton from "./AuthButton";

export default function Navbar({ isLoggedIn, onLogin, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0b12]/80 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-purple-300 tracking-wide">
          StarWars<span className="text-purple-400">Hub</span>
        </h1>


        <div className="hidden sm:flex">
          <AuthButton
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onLogout={onLogout}
          />
        </div>


        <button
          className="sm:hidden p-2 rounded-lg hover:bg-gray-800 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="text-purple-400 w-6 h-6" />
          ) : (
            <Menu className="text-purple-400 w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-[#0b0b12] border-t border-purple-900/30 p-3 space-y-3">
          <AuthButton
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onLogout={onLogout}
            className="w-full py-2"
          />
        </div>
      )}
    </nav>
  );
}
