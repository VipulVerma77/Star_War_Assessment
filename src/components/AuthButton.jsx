import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../auth/Login";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {user ? (
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      ) : (
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          <LogIn size={18} /> Login
        </button>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}
