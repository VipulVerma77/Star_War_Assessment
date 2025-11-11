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
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="text-slate-300 mb-4 sm:mb-0">
        Showing{" "}
        <span className="text-yellow-400 font-bold">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="text-yellow-400 font-bold">{totalCount}</span>{" "}
        characters
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-slate-300">Page {page}</span>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-slate-600 transition-all duration-200 flex items-center space-x-2 text-slate-200 hover:text-white font-medium"
            disabled={!hasPrev || loading}
            onClick={onPrev}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-slate-600 transition-all duration-200 flex items-center space-x-2 text-slate-200 hover:text-white font-medium"
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
