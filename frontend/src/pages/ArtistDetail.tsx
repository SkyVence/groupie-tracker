import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService, type ApiArtist, type Relation } from "../services/api";
import ConcertMap from "../components/ConcertMap";

interface Concert {
  date: string;
  location: string;
  rawLocation: string;
}

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState<ApiArtist | null>(null);
  const [relations, setRelations] = useState<Relation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await apiService.getArtistWithDetails(Number(id));
        setArtist(data.artist);
        setRelations(data.relations || null);
      } catch (err) {
        setError("Artiste non trouvé");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-white">Artiste non trouvé</h1>
        <Link
          to="/"
          className="px-6 py-3 bg-dark-700 border border-dark-500 rounded-lg text-white hover:border-accent transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Préparer les concerts
  const concerts: Concert[] = relations
    ? Object.entries(relations.datesLocations).flatMap(([location, dates]) =>
        dates.map((date) => ({
          date,
          location: location.replace(/-/g, ", ").replace(/_/g, " "),
          rawLocation: location,
        }))
      )
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </Link>

      {/* Artist Header Card */}
      <div className="bg-dark-700 border border-dark-500 rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image */}
          <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden border border-dark-500 flex-shrink-0">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {artist.name}
            </h1>
            
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-400 text-sm mb-4">
              <span>{artist.members.length} membre{artist.members.length > 1 ? "s" : ""}</span>
              <span className="text-dark-500">•</span>
              <span>Créé en {artist.creationDate}</span>
              <span className="text-dark-500">•</span>
              <span>Premier album: {artist.firstAlbum}</span>
            </div>

            {/* Members */}
            <div className="flex flex-wrap gap-2">
              {artist.members.map((member, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-dark-800 border border-dark-500 rounded-full text-sm text-gray-300"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concerts Section */}
      {concerts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Concert List */}
          <div className="bg-dark-700 border border-dark-500 rounded-2xl p-5">
            <h2 className="text-xl font-bold text-white mb-4">
              Concerts ({concerts.length})
            </h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {concerts.map((concert, index) => {
                const isSelected = selectedConcert?.date === concert.date && 
                                   selectedConcert?.rawLocation === concert.rawLocation;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedConcert(isSelected ? null : concert)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-accent/10 border-accent text-white"
                        : "bg-dark-800 border-dark-500 text-gray-300 hover:border-dark-500/80 hover:bg-dark-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                        isSelected ? "bg-accent" : "bg-dark-500"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${isSelected ? "text-white" : "text-gray-200"}`}>
                          {concert.date}
                        </p>
                        <p className={`text-sm truncate ${isSelected ? "text-accent" : "text-gray-500"}`}>
                          {concert.location}
                        </p>
                      </div>
                      <svg 
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          isSelected ? "text-accent rotate-90" : "text-gray-600"
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div className="bg-dark-700 border border-dark-500 rounded-2xl p-5">
            <h2 className="text-xl font-bold text-white mb-4">Localisation</h2>
            {selectedConcert ? (
              <ConcertMap 
                location={selectedConcert.location} 
                date={selectedConcert.date}
              />
            ) : (
              <div className="h-[400px] bg-dark-800 border border-dark-500 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Sélectionnez un concert</p>
                  <p className="text-sm mt-1">pour voir sa localisation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No concerts */}
      {concerts.length === 0 && (
        <div className="bg-dark-700 border border-dark-500 rounded-2xl p-8 text-center">
          <p className="text-gray-500">Aucun concert disponible</p>
        </div>
      )}
    </main>
  );
}

export default ArtistDetail;
