import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService, type ApiArtist, type Relation } from "../services/api";
import ConcertMap from "../components/ConcertMap";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState<ApiArtist | null>(null);
  const [relations, setRelations] = useState<Relation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="container">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2>Chargement...</h2>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Artiste non trouvé</h1>
          <Link to="/" className="back-button">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Préparer les concerts à partir des relations
  const concerts = relations
    ? Object.entries(relations.datesLocations).flatMap(([location, dates]) =>
        dates.map((date) => ({
          date,
          location: location.replace(/-/g, ", ").replace(/_/g, " "),
        }))
      )
    : [];

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Retour
      </Link>

      <div className="artist-detail">
        <div className="artist-header">
          <div className="artist-cover">
            <img src={artist.image} alt={artist.name} />
          </div>
          <div className="artist-main-info">
            <h1>{artist.name}</h1>
            <div className="artist-meta">
              <span>{artist.members.length} membres</span>
              <span>•</span>
              <span>Créé en {artist.creationDate}</span>
              <span>•</span>
              <span>Premier album: {artist.firstAlbum}</span>
            </div>
            <div className="artist-members">
              <h3>Membres:</h3>
              <ul>
                {artist.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="artist-content">
          {concerts.length > 0 && (
            <section className="concerts-section">
              <h2>Dates de concerts ({concerts.length})</h2>
              <div className="concerts-list">
                {concerts.map((concert, index) => (
                  <div key={index} className="concert-card">
                    <div className="concert-date">
                      <span className="date-day">{concert.date}</span>
                    </div>
                    <div className="concert-info">
                      <h3>{concert.location}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relations && <ConcertMap artistName={artist.name} relations={relations} />}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
