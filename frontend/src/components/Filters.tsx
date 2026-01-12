import { useState, useEffect, useRef } from "react";
import type { ApiArtist, Relation } from "../services/api";

interface FiltersProps {
  artists: ApiArtist[];
  relations: Relation[];
  onFilterChange: (filtered: ApiArtist[]) => void;
}

interface FilterState {
  creationYear: string;
  firstAlbumYear: string;
  memberCount: string;
  location: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder: string;
}

function Dropdown({ label, value, options, onChange, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 bg-dark-800 border rounded-lg text-left text-sm flex items-center justify-between transition-colors ${
          isOpen ? "border-accent" : value ? "border-accent/50" : "border-dark-500 hover:border-dark-500/80"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-dark-800 border border-dark-500 rounded-lg overflow-hidden shadow-xl z-50">
          {options.length > 10 && (
            <div className="p-2 border-b border-dark-500">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 bg-dark-700 border border-dark-500 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>
          )}
          <div className="max-h-40 overflow-y-auto">
            <div
              className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                !value ? "bg-accent/10 text-accent" : "text-gray-400 hover:bg-dark-700"
              }`}
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setSearchTerm("");
              }}
            >
              {placeholder}
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                  value === option.value
                    ? "bg-accent/10 text-accent"
                    : "text-gray-300 hover:bg-dark-700"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Panel de filtres (utilisé en desktop et dans le drawer mobile)
export function FilterPanel({ 
  filters, 
  setFilters, 
  creationYearOptions, 
  firstAlbumYearOptions, 
  memberCountOptions, 
  locationOptions,
  activeFilterCount,
  resetFilters 
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  creationYearOptions: { value: string; label: string }[];
  firstAlbumYearOptions: { value: string; label: string }[];
  memberCountOptions: { value: string; label: string }[];
  locationOptions: { value: string; label: string }[];
  activeFilterCount: number;
  resetFilters: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Filtres</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <Dropdown
        label="Année de création"
        value={filters.creationYear}
        options={creationYearOptions}
        onChange={(value) => setFilters((prev) => ({ ...prev, creationYear: value }))}
        placeholder="Toutes"
      />

      <Dropdown
        label="Premier album"
        value={filters.firstAlbumYear}
        options={firstAlbumYearOptions}
        onChange={(value) => setFilters((prev) => ({ ...prev, firstAlbumYear: value }))}
        placeholder="Toutes"
      />

      <Dropdown
        label="Nombre de membres"
        value={filters.memberCount}
        options={memberCountOptions}
        onChange={(value) => setFilters((prev) => ({ ...prev, memberCount: value }))}
        placeholder="Tous"
      />

      <Dropdown
        label="Lieu de concert"
        value={filters.location}
        options={locationOptions}
        onChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
        placeholder="Tous"
      />
    </div>
  );
}

function Filters({ artists, relations, onFilterChange }: FiltersProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    creationYear: "",
    firstAlbumYear: "",
    memberCount: "",
    location: "",
  });

  const creationYears = [...new Set(artists.map((a) => a.creationDate))].sort((a, b) => a - b);
  const creationYearOptions = creationYears.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const firstAlbumYears = [...new Set(artists.map((a) => parseInt(a.firstAlbum.split("-")[2] || "0")))].sort((a, b) => a - b);
  const firstAlbumYearOptions = firstAlbumYears.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const uniqueMemberCounts = [...new Set(artists.map((a) => a.members.length))].sort((a, b) => a - b);
  const memberCountOptions = uniqueMemberCounts.map((count) => ({
    value: count.toString(),
    label: count === 1 ? "1 membre" : `${count} membres`,
  }));

  const allLocations = new Set<string>();
  relations.forEach((rel) => {
    Object.keys(rel.datesLocations).forEach((loc) => {
      const formatted = loc.replace(/-/g, ", ").replace(/_/g, " ");
      allLocations.add(formatted);
    });
  });
  const uniqueLocations = Array.from(allLocations).sort();
  const locationOptions = uniqueLocations.map((loc) => ({
    value: loc,
    label: loc,
  }));

  useEffect(() => {
    let filtered = [...artists];

    if (filters.creationYear) {
      const year = parseInt(filters.creationYear);
      filtered = filtered.filter((a) => a.creationDate === year);
    }

    if (filters.firstAlbumYear) {
      const year = parseInt(filters.firstAlbumYear);
      filtered = filtered.filter((a) => {
        const albumYear = parseInt(a.firstAlbum.split("-")[2] || "0");
        return albumYear === year;
      });
    }

    if (filters.memberCount) {
      const count = parseInt(filters.memberCount);
      filtered = filtered.filter((a) => a.members.length === count);
    }

    if (filters.location) {
      filtered = filtered.filter((a) => {
        const artistRelations = relations.find((r) => r.id === a.id);
        if (!artistRelations) return false;

        const artistLocations = Object.keys(artistRelations.datesLocations).map((loc) =>
          loc.replace(/-/g, ", ").replace(/_/g, " ")
        );

        return artistLocations.some(
          (artistLoc) =>
            artistLoc.toLowerCase().includes(filters.location.toLowerCase()) ||
            filters.location.toLowerCase().includes(artistLoc.toLowerCase())
        );
      });
    }

    onFilterChange(filtered);
  }, [filters, artists, relations, onFilterChange]);

  const resetFilters = () => {
    setFilters({
      creationYear: "",
      firstAlbumYear: "",
      memberCount: "",
      location: "",
    });
  };

  const activeFilterCount = [
    filters.creationYear,
    filters.firstAlbumYear,
    filters.memberCount,
    filters.location,
  ].filter((f) => f !== "").length;

  const panelProps = {
    filters,
    setFilters,
    creationYearOptions,
    firstAlbumYearOptions,
    memberCountOptions,
    locationOptions,
    activeFilterCount,
    resetFilters,
  };

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:block w-64 flex-shrink-0 bg-dark-700 border border-dark-500 rounded-xl p-4 h-fit sticky top-0">
        <FilterPanel {...panelProps} />
      </div>

      {/* Mobile: Floating Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 bg-accent hover:bg-accent-hover rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile: Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeInBackdrop"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-dark-700 border-l border-dark-500 animate-slideInRight">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-500">
              <h2 className="text-lg font-bold text-white">Filtres</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto h-[calc(100%-130px)]">
              <FilterPanel {...panelProps} />
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-500 bg-dark-700">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;
