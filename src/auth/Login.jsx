import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 top-80 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="relative bg-slate-900/95 p-6 rounded-2xl border border-purple-500/30 w-[90%] max-w-sm shadow-2xl">
        
        <button onClick={onClose} className="absolute top-3 right-3 text-purple-400 hover:text-purple-300 transition">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">Login</h2>

        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-800/70 px-3 py-2 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-800/70 px-3 py-2 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {error && ( <p className="text-red-400 text-sm text-center">{error}</p>)}

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md text-white font-semibold transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
