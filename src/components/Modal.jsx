import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Film,
  Globe,
  User,
  Scale,
  Calendar,
  Users,
} from "lucide-react";
import { getHomeworld, getSpeciesDetails } from "../api/apiHandler.js";
import Loader from "./Loader.jsx";

export default function Modal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [homeworldData, speciesData] = await Promise.all([
          getHomeworld(character.homeworld),
          character.species?.length
            ? getSpeciesDetails(character.species[0])
            : Promise.resolve({ name: "Unknown" }),
        ]);
        setHomeworld(homeworldData);
        setSpecies(speciesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [character]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {loading ? (
        <div className="modal-overlay">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
          </div>
        </div>
      ) : (
        <div
          className={`modal-overlay ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleBackdropClick}
        >
          <div
            className={`modal-container relative w-[90%] max-w-md max-h-[85vh] flex flex-col transform ${
              isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <button
              onClick={handleClose}
              className="close-button absolute top-4 right-4"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4 mb-6 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                <img
                  src={`https://picsum.photos/seed/${character.name}/300/300`}
                  alt={character.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-purple-500/60 shadow-xl relative z-10"
                />
              </div>

              <div>
                <h2 className="gradient-title">{character.name}</h2>
                <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="info-box">
                  <div className="info-label">
                    <User size={12} className="text-purple-400 flex-shrink-0" />
                    <span>Gender</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium capitalize truncate">
                    {character.gender}
                  </p>
                </div>

                <div className="info-box">
                  <div className="info-label">
                    <Calendar
                      size={12}
                      className="text-purple-400 flex-shrink-0"
                    />
                    <span>Birth Year</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {character.birth_year}
                  </p>
                </div>

                <div className="info-box">
                  <div className="info-label">
                    <Scale size={12} className="text-purple-400 flex-shrink-0" />
                    <span>Height</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {(character.height / 100).toFixed(2)} m
                  </p>
                </div>

                <div className="info-box">
                  <div className="info-label">
                    <Users size={12} className="text-purple-400 flex-shrink-0" />
                    <span>Mass</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {character.mass} kg
                  </p>
                </div>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-slate-700/50">
                <div className="flex items-center space-x-2 text-purple-300 mb-2">
                  <Film size={14} className="text-purple-400 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">
                    Film Appearances
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
                    {character.films?.length || 0} films
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400">
                    {character.films?.length === 1
                      ? "appearance"
                      : "appearances"}
                  </span>
                </div>
              </div>
              {homeworld && (
                <div className="gradient-box">
                  <h3 className="font-semibold text-purple-300 flex items-center gap-2 mb-2 sm:mb-3 text-sm sm:text-base">
                    <Globe
                      size={14}
                      className="text-purple-400 flex-shrink-0"
                    />
                    <span>Homeworld: {homeworld.name}</span>
                  </h3>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin
                        size={12}
                        className="text-purple-400 flex-shrink-0"
                      />
                      <span>
                        Terrain:{" "}
                        <span className="text-slate-400">
                          {homeworld.terrain}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        🌤
                      </span>
                      <span>
                        Climate:{" "}
                        <span className="text-slate-400">
                          {homeworld.climate}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Users
                        size={12}
                        className="text-purple-400 flex-shrink-0"
                      />
                      <span>
                        Population:{" "}
                        <span className="text-slate-400">
                          {homeworld.population}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
