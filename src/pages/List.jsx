import { useEffect, useState } from "react";
import { getCharacter } from "../api/apiHandler";
import { Card, Error, Loader, Pagination } from "../components"; 

export default function List() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharacter(page);
      setCharacters(data.results);
      setHasNext(!!data.next);
      setHasPrev(!!data.previous);
      setTotalCount(data.count || 0);
    } catch (err) {
      setError("Transmission lost. Unable to reach the galaxy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const itemsPerPage = 10;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Star Wars Characters
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-glow"></div>
          </div>
          <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Explore the vast universe of Star Wars characters across all eras
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[400px] space-y-6">
            <Loader />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Error
              message={error}
              onRetry={() => {
                setPage(1);
                setError(null);
              }}
            />
          </div>
        )}

        {/* Characters */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 animate-fade-in">
              {characters.map((char, index) => (
                <Card
                  key={char.name}
                  character={char}
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {/* ✅ Pagination Component */}
            <Pagination
              page={page}
              hasPrev={hasPrev}
              hasNext={hasNext}
              loading={loading}
              totalCount={totalCount}
              startItem={startItem}
              endItem={endItem}
              onPrev={() => setPage((p) => Math.max(p - 1, 1))}
              onNext={() => setPage((p) => p + 1)}
            />
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            Data provided by the Star Wars API • May the Force be with you
          </p>
        </div>
      </div>
    </div>
  );
}
