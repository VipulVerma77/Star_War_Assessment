
export default function Card({ character }) {
  const characterImg = `https://picsum.photos/seed/${character.name}/300/300`;

  return (
    <div className="card cursor-pointer group hover:shadow-purple-500/20 transition-all">
      <img
        src={characterImg}
        alt={character.name}
        className="w-full h-48 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300"
      />
      <h2 className="text-xl font-semibold mb-1 text-purple-300 group-hover:text-purple-200">
        {character.name}
      </h2>
      <p className="text-gray-400 text-sm">
        Gender: <span className="capitalize">{character.gender}</span>
      </p>
      <p className="text-gray-400 text-sm">Birth Year: {character.birth_year}</p>
    </div>
  );
}
