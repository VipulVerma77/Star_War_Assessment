import { Search } from "lucide-react";

export default function SearchBox({ value, onChange, onSubmit, className = "" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center bg-gray-900/70 border border-gray-700 rounded-lg px-2 ${className}`}
    >
      <Search className="text-purple-400 w-4 h-4 mr-1" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent focus:outline-none text-gray-200 placeholder-gray-500 px-1 py-1 w-full"
      />
    </form>
  );
}
