import Navbar from "./Navbar";

export default function Layout({ children }) {
  const isLoggedIn = true;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => alert("Mock Login")}
        onLogout={() => alert("Mock Logout")}
      />
      <main className="flex-1">{children}</main>
      <footer className="text-center py-4 text-gray-500 text-sm border-t border-purple-900/30 bg-[#0b0b12]">
        © {new Date().getFullYear()} Vipul verma ⚡
      </footer>
    </div>
  );
}
