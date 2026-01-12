import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService, type ApiArtist, type Relation } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

function Home() {
  const [artists, setArtists] = useState<ApiArtist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<ApiArtist[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllData();
        setArtists(data.artists);
        setFilteredArtists(data.artists);
        setRelations(data.relations);
      } catch (err) {
        setError("Erreur lors du chargement des artistes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculer le nombre de concerts par artiste
  const getConcertCount = (artistId: number): number => {
    const artistRelations = relations.find((r) => r.id === artistId);
    if (!artistRelations) return 0;
    return Object.values(artistRelations.datesLocations).reduce(
      (total, dates) => total + dates.length,
      0
    );
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 text-center py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Groupie Tracker
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          By Antoine Mathié and Paolo Antonini
        </p>
        <SearchBar artists={artists} relations={relations} />
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 px-4 pb-0">
        <div className="h-full max-w-7xl mx-auto flex gap-6">
          {/* Artists Grid - Scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-2">
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                {filteredArtists.map((artist) => {
                  const concertCount = getConcertCount(artist.id);
                  return (
                    <Link
                      to={`/artist/${artist.id}`}
                      key={artist.id}
                      className="group bg-dark-700 rounded-xl overflow-hidden border border-dark-500 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-dark-800">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-white mb-2 truncate">
                          {artist.name}
                        </h2>
                        
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{artist.members.length} membre{artist.members.length > 1 ? "s" : ""}</span>
                            <span className="text-dark-500">•</span>
                            <span>Depuis {artist.creationDate}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-500">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                            <span className="truncate">Album: {artist.firstAlbum}</span>
                          </div>
                          
                          {concertCount > 0 && (
                            <div className="flex items-center gap-2 text-accent">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{concertCount} concert{concertCount > 1 ? "s" : ""}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-lg">Aucun artiste trouvé</p>
              </div>
            )}
          </div>

          {/* Filters Panel - Desktop */}
          <Filters
            artists={artists}
            relations={relations}
            onFilterChange={setFilteredArtists}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
