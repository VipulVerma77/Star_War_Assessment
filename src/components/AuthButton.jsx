import { LogIn, LogOut } from "lucide-react";

export default function AuthButton({ isLoggedIn, onLogin, onLogout, className = "" }) {
  const handleClick = () => {
    isLoggedIn ? onLogout() : onLogin();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all ${className}`}
    >
      {isLoggedIn ? (
        <>
          <LogOut size={16} />
          <span>Logout</span>
        </>
      ) : (
        <>
          <LogIn size={16} />
          <span>Login</span>
        </>
      )}
    </button>
  );
}
