import { useCallback, useEffect, useState } from "react";
import { getCharacter } from "../api/apiHandler";
import { Card, Error, Loader, Pagination, SearchBox } from "../components";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hook/useDebounce";

export default function List() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharacter(page, debouncedSearch);
      setData(data.results);
      setHasNext(!!data.next);
      setHasPrev(!!data.previous);
      setTotalCount(data.count || 0);
    } catch (err) {
      setData([]);
      setError("Transmission lost. Unable to reach the galaxy");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData,debouncedSearch]);

  const handleCardClick = (char) => {
    if (user) {
      setSelectedData(char);
    } else {
      setShowLoginMsg(true);
      setTimeout(() => setShowLoginMsg(false), 2500);
    }
  };

  const itemsPerPage = 10;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-8 px-4 relative">
      <div className="max-w-7xl mx-auto">

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

        <div className="flex justify-center mb-8">
          <SearchBox
            value={search}
            onChange={setSearch}
            onSubmit={(e) => e.preventDefault()}
            className="w-full sm:w-1/2"
          />
        </div>

        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[400px] space-y-6">
            <Loader />
          </div>
        )}

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

        {!loading && !error && (
          <>
            {data.length === 0 ? (
                 <Error
              message={error}
              onRetry={() => {
                setPage(1);
                setError(null);
              }}
            />
              
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 animate-fade-in">
                {data.map((char, index) => (
                  <div
                    key={char.name}
                    onClick={() => handleCardClick(char)}
                    className="cursor-pointer"
                  >
                    <Card
                      character={char}
                      className="transform hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  </div>
                ))}
              </div>
            )}

          { data?.length !==0 && <Pagination
              page={page}
              hasPrev={hasPrev}
              hasNext={hasNext}
              loading={loading}
              totalCount={totalCount}
              startItem={startItem}
              endItem={endItem}
              onPrev={() => setPage((p) => Math.max(p - 1, 1))}
              onNext={() => setPage((p) => p + 1)}
            />}
          </>
        )}
      </div>

      {selectedData && (
        <Modal
          character={selectedData}
          onClose={() => setSelectedData(null)}
        />
      )}

      {showLoginMsg && (
        <div className="fixed bottom-10 right-1 -translate-x-1/2 bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg text-sm animate-fade-in-out flex items-center gap-2">
          <span>Please login to view details</span>
        </div>
      )}
    </div>
  );
}
