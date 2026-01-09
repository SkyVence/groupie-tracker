import { useState, useEffect } from "react";
import type { ApiArtist, Relation } from "../services/api";
import "./Filters.css";

interface FiltersProps {
  artists: ApiArtist[];
  relations: Relation[];
  onFilterChange: (filtered: ApiArtist[]) => void;
}

interface FilterState {
  creationDateRange: [number, number];
  firstAlbumYearRange: [number, number];
  memberCount: number[];
  locations: string[];
}

function Filters({ artists, relations, onFilterChange }: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    creationDateRange: [0, 0],
    firstAlbumYearRange: [0, 0],
    memberCount: [],
    locations: [],
  });

  // Get min/max values for ranges
  const creationYears = artists.map((a) => a.creationDate);
  const minCreationYear = Math.min(...creationYears);
  const maxCreationYear = Math.max(...creationYears);

  const firstAlbumYears = artists.map((a) =>
    parseInt(a.firstAlbum.split("-")[2] || "0")
  );
  const minFirstAlbum = Math.min(...firstAlbumYears);
  const maxFirstAlbum = Math.max(...firstAlbumYears);

  // Get unique member counts
  const uniqueMemberCounts = [
    ...new Set(artists.map((a) => a.members.length)),
  ].sort((a, b) => a - b);

  // Get all unique locations
  const allLocations = new Set<string>();
  relations.forEach((rel) => {
    Object.keys(rel.datesLocations).forEach((loc) => {
      const formatted = loc.replace(/-/g, ", ").replace(/_/g, " ");
      allLocations.add(formatted);
    });
  });
  const uniqueLocations = Array.from(allLocations).sort();

  // Initialize filters
  useEffect(() => {
    if (artists.length > 0) {
      setFilters({
        creationDateRange: [minCreationYear, maxCreationYear],
        firstAlbumYearRange: [minFirstAlbum, maxFirstAlbum],
        memberCount: [],
        locations: [],
      });
    }
  }, [artists, minCreationYear, maxCreationYear, minFirstAlbum, maxFirstAlbum]);

  // Apply filters
  useEffect(() => {
    let filtered = [...artists];

    // Filter by creation date
    filtered = filtered.filter(
      (a) =>
        a.creationDate >= filters.creationDateRange[0] &&
        a.creationDate <= filters.creationDateRange[1]
    );

    // Filter by first album year
    filtered = filtered.filter((a) => {
      const year = parseInt(a.firstAlbum.split("-")[2] || "0");
      return (
        year >= filters.firstAlbumYearRange[0] &&
        year <= filters.firstAlbumYearRange[1]
      );
    });

    // Filter by member count
    if (filters.memberCount.length > 0) {
      filtered = filtered.filter((a) =>
        filters.memberCount.includes(a.members.length)
      );
    }

    // Filter by locations
    if (filters.locations.length > 0) {
      filtered = filtered.filter((a) => {
        const artistRelations = relations.find((r) => r.id === a.id);
        if (!artistRelations) return false;

        const artistLocations = Object.keys(
          artistRelations.datesLocations
        ).map((loc) => loc.replace(/-/g, ", ").replace(/_/g, " "));

        return filters.locations.some((filterLoc) =>
          artistLocations.some(
            (artistLoc) =>
              artistLoc.toLowerCase().includes(filterLoc.toLowerCase()) ||
              filterLoc.toLowerCase().includes(artistLoc.toLowerCase())
          )
        );
      });
    }

    onFilterChange(filtered);
  }, [filters, artists, relations, onFilterChange]);

  const handleMemberCountChange = (count: number) => {
    setFilters((prev) => ({
      ...prev,
      memberCount: prev.memberCount.includes(count)
        ? prev.memberCount.filter((c) => c !== count)
        : [...prev.memberCount, count],
    }));
  };

  const handleLocationChange = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  };

  const resetFilters = () => {
    setFilters({
      creationDateRange: [minCreationYear, maxCreationYear],
      firstAlbumYearRange: [minFirstAlbum, maxFirstAlbum],
      memberCount: [],
      locations: [],
    });
  };

  const hasActiveFilters =
    filters.creationDateRange[0] !== minCreationYear ||
    filters.creationDateRange[1] !== maxCreationYear ||
    filters.firstAlbumYearRange[0] !== minFirstAlbum ||
    filters.firstAlbumYearRange[1] !== maxFirstAlbum ||
    filters.memberCount.length > 0 ||
    filters.locations.length > 0;

  return (
    <div className="filters-container">
      <button
        className="filters-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        🎛️ Filters
        {hasActiveFilters && <span className="filter-badge">●</span>}
      </button>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="reset-button" onClick={resetFilters}>
                Reset All
              </button>
            )}
          </div>

          {/* Creation Date Range */}
          <div className="filter-group">
            <label>Creation Date</label>
            <div className="range-inputs">
              <input
                type="number"
                min={minCreationYear}
                max={maxCreationYear}
                value={filters.creationDateRange[0]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    creationDateRange: [
                      parseInt(e.target.value),
                      prev.creationDateRange[1],
                    ],
                  }))
                }
              />
              <span>to</span>
              <input
                type="number"
                min={minCreationYear}
                max={maxCreationYear}
                value={filters.creationDateRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    creationDateRange: [
                      prev.creationDateRange[0],
                      parseInt(e.target.value),
                    ],
                  }))
                }
              />
            </div>
            <input
              type="range"
              min={minCreationYear}
              max={maxCreationYear}
              value={filters.creationDateRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  creationDateRange: [
                    parseInt(e.target.value),
                    prev.creationDateRange[1],
                  ],
                }))
              }
              className="range-slider"
            />
            <input
              type="range"
              min={minCreationYear}
              max={maxCreationYear}
              value={filters.creationDateRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  creationDateRange: [
                    prev.creationDateRange[0],
                    parseInt(e.target.value),
                  ],
                }))
              }
              className="range-slider"
            />
          </div>

          {/* First Album Year Range */}
          <div className="filter-group">
            <label>First Album Date</label>
            <div className="range-inputs">
              <input
                type="number"
                min={minFirstAlbum}
                max={maxFirstAlbum}
                value={filters.firstAlbumYearRange[0]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    firstAlbumYearRange: [
                      parseInt(e.target.value),
                      prev.firstAlbumYearRange[1],
                    ],
                  }))
                }
              />
              <span>to</span>
              <input
                type="number"
                min={minFirstAlbum}
                max={maxFirstAlbum}
                value={filters.firstAlbumYearRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    firstAlbumYearRange: [
                      prev.firstAlbumYearRange[0],
                      parseInt(e.target.value),
                    ],
                  }))
                }
              />
            </div>
            <input
              type="range"
              min={minFirstAlbum}
              max={maxFirstAlbum}
              value={filters.firstAlbumYearRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  firstAlbumYearRange: [
                    parseInt(e.target.value),
                    prev.firstAlbumYearRange[1],
                  ],
                }))
              }
              className="range-slider"
            />
            <input
              type="range"
              min={minFirstAlbum}
              max={maxFirstAlbum}
              value={filters.firstAlbumYearRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  firstAlbumYearRange: [
                    prev.firstAlbumYearRange[0],
                    parseInt(e.target.value),
                  ],
                }))
              }
              className="range-slider"
            />
          </div>

          {/* Number of Members */}
          <div className="filter-group">
            <label>Number of Members</label>
            <div className="checkbox-group">
              {uniqueMemberCounts.map((count) => (
                <label key={count} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.memberCount.includes(count)}
                    onChange={() => handleMemberCountChange(count)}
                  />
                  <span>{count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="filter-group">
            <label>Concert Locations ({uniqueLocations.length})</label>
            <div className="checkbox-group locations-list">
              {uniqueLocations.slice(0, 20).map((location) => (
                <label key={location} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                  />
                  <span>{location}</span>
                </label>
              ))}
              {uniqueLocations.length > 20 && (
                <p className="more-locations">
                  +{uniqueLocations.length - 20} more locations...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
