export default function Card({ character }) {
  const profileImg = `https://picsum.photos/seed/${character.name}/300/300`;

  return (
    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900 rounded-2xl p-4 cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-slate-700/50 hover:border-purple-500/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={profileImg}
          alt={character.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
    
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
          {character.name}
        </h2>
        
        <div className="space-y-1.5">
          <div className="flex items-center text-sm">
            <span className="text-slate-400 w-16 flex-shrink-0">Gender:</span>
            <span className="text-slate-200 font-medium capitalize">{character.gender}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-slate-400 w-16 flex-shrink-0">Birth:</span>
            <span className="medium">{character.birth_year}</span>
          </div>
        </div>      
      </div>
    </div>
  );
}