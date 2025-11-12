export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-400"></div>
        <div className="absolute inset-0 rounded-full blur-sm border-4 border-purple-500/40 animate-pulse"></div>
      </div>
      <p className="text-purple-300 font-medium animate-glow">
        <span className="text-slate-300 text-lg animate-pulse">Scanning the galaxy for characters...</span>
      </p>
    </div>
  );
}
