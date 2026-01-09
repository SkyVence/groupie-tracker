import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ApiArtist, Relation } from "../services/api";
import "./SearchBar.css";

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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
      // Search by artist name
      if (artist.name.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: "artist",
          value: artist.name,
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      // Search by members
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

      // Search by creation date
      if (artist.creationDate.toString().includes(term)) {
        newSuggestions.push({
          type: "creation-date",
          value: artist.creationDate.toString(),
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      // Search by first album
      if (artist.firstAlbum.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: "first-album",
          value: artist.firstAlbum,
          artistId: artist.id,
          artistName: artist.name,
        });
      }

      // Search by locations
      const artistRelations = relations.find((r) => r.id === artist.id);
      if (artistRelations) {
        Object.keys(artistRelations.datesLocations).forEach((location) => {
          const formattedLocation = location
            .replace(/-/g, ", ")
            .replace(/_/g, " ");
          if (formattedLocation.toLowerCase().includes(term)) {
            // Avoid duplicates
            if (
              !newSuggestions.some(
                (s) =>
                  s.type === "location" &&
                  s.value === formattedLocation &&
                  s.artistId === artist.id
              )
            ) {
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

    // Limit suggestions to 10
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
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
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
    switch (type) {
      case "artist":
        return "artist/band";
      case "member":
        return "member";
      case "location":
        return "location";
      case "creation-date":
        return "creation date";
      case "first-album":
        return "first album";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: SearchSuggestion["type"]): string => {
    switch (type) {
      case "artist":
        return "🎸";
      case "member":
        return "👤";
      case "location":
        return "📍";
      case "creation-date":
        return "📅";
      case "first-album":
        return "💿";
      default:
        return "";
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for artists, members, dates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm("");
              setSuggestions([]);
              setShowSuggestions(false);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}-${suggestion.artistId}-${index}`}
              className={`suggestion-item ${
                index === selectedIndex ? "selected" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-icon">
                {getTypeIcon(suggestion.type)}
              </span>
              <div className="suggestion-content">
                <span className="suggestion-value">{suggestion.value}</span>
                <span className="suggestion-meta">
                  <span className="suggestion-type">
                    {getTypeLabel(suggestion.type)}
                  </span>
                  {suggestion.type !== "artist" && (
                    <>
                      <span className="separator">•</span>
                      <span className="suggestion-artist">
                        {suggestion.artistName}
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && searchTerm && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-results">No results found</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
