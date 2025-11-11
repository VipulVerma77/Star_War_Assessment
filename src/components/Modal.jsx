import React from "react";
import { X, User, Ruler, Weight, Calendar, Film } from "lucide-react";

export default function Modal({ isOpen, onClose, character }) {
  if (!isOpen || !character) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        className="relative bg-gradient-to-br from-[#161627] to-[#232343] border border-purple-500/30 rounded-2xl p-6 w-[90%] max-w-md shadow-[0_0_25px_#c084fc50] text-gray-100 transform scale-100 transition-transform duration-300"
      >
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <X size={22} />
        </button>

      
        <div className="flex flex-col items-center space-y-2 mb-6">
          <User className="text-purple-400 w-10 h-10" />
          <h2 className="text-2xl font-semibold text-purple-300">
            {character.name}
          </h2>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-purple-400" />
            <span>Height: {character.height} cm</span>
          </div>

          <div className="flex items-center gap-2">
            <Weight size={18} className="text-purple-400" />
            <span>Mass: {character.mass} kg</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-purple-400" />
            <span>Birth Year: {character.birth_year}</span>
          </div>

          <div className="flex items-center gap-2">
            <Film size={18} className="text-purple-400" />
            <span>Films Appeared: {character.films?.length || 0}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="btn bg-purple-600 hover:bg-purple-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
