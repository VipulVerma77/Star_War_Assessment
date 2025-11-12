import React from "react";

export default function Pagination({
  page,
  hasPrev,
  hasNext,
  loading,
  totalCount,
  startItem,
  endItem,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700 shadow-lg">
      {/* Info Section */}
      <div className="text-center sm:text-left text-slate-300 text-sm sm:text-base">
        Showing{" "}
        <span className="text-yellow-400 font-semibold">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="text-yellow-400 font-semibold">{totalCount}</span>{" "}
        characters
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-400 text-sm sm:text-base">
          Page <span className="text-white font-semibold">{page}</span>
        </span>

        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg border border-slate-600 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 
              text-slate-200 font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed`}
            disabled={!hasPrev || loading}
            onClick={onPrev}
          >
            Prev
          </button>

          <button
            className={`px-4 py-2 rounded-lg border border-slate-600 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 
              text-slate-900 font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed`}
            disabled={!hasNext || loading}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
