import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ApiArtist, Relation } from "../services/api";

interface SearchSuggestion {
  type: "artist" | "member" | "location" | "creation-date" | "first-album";
  value: string;
  artistId: number;
  artistName: string;
}

interface SearchBarProps {
  artists: ApiArtist[];
  relations: Relation[];
}

function SearchBar({ artists, relations }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    artists.forEach((artist) => {
      if (artist.name.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: "artist",
          value: artist.name,
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      artist.members.forEach((member) => {
        if (member.toLowerCase().includes(term)) {
          newSuggestions.push({
            type: "member",
            value: member,
            artistId: artist.id,
            artistName: artist.name,
          });
        }
      });

      if (artist.creationDate.toString().includes(term)) {
        newSuggestions.push({
          type: "creation-date",
          value: artist.creationDate.toString(),
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      if (artist.firstAlbum.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: "first-album",
          value: artist.firstAlbum,
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      const artistRelations = relations.find((r) => r.id === artist.id);
      if (artistRelations) {
        Object.keys(artistRelations.datesLocations).forEach((location) => {
          const formattedLocation = location.replace(/-/g, ", ").replace(/_/g, " ");
          if (formattedLocation.toLowerCase().includes(term)) {
            if (!newSuggestions.some((s) => s.type === "location" && s.value === formattedLocation && s.artistId === artist.id)) {
              newSuggestions.push({
                type: "location",
                value: formattedLocation,
                artistId: artist.id,
                artistName: artist.name,
              });
            }
          }
        });
      }
    });

    setSuggestions(newSuggestions.slice(0, 10));
    setShowSuggestions(true);
    setSelectedIndex(-1);
  }, [searchTerm, artists, relations]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    navigate(`/artist/${suggestion.artistId}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const getTypeLabel = (type: SearchSuggestion["type"]): string => {
    const labels = {
      artist: "artiste",
      member: "membre",
      location: "lieu",
      "creation-date": "création",
      "first-album": "album",
    };
    return labels[type];
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Rechercher artistes, membres, lieux..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          className="w-full pl-12 pr-10 py-3 bg-dark-700 border-2 border-dark-500 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-700 border border-dark-500 rounded-xl overflow-hidden shadow-xl z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}-${suggestion.artistId}-${index}`}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex ? "bg-dark-600" : "hover:bg-dark-600"
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{suggestion.value}</p>
                <p className="text-sm text-gray-500">
                  <span className="text-accent">{getTypeLabel(suggestion.type)}</span>
                  {suggestion.type !== "artist" && (
                    <span> • {suggestion.artistName}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && searchTerm && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-700 border border-dark-500 rounded-xl overflow-hidden shadow-xl z-50">
          <div className="px-4 py-6 text-center text-gray-500">
            Aucun résultat trouvé
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
