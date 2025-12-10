import { useParams, Link } from "react-router-dom";
import { artists } from "../data/artists";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === Number(id));

  if (!artist) {
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
              <span>{artist.members} membres</span>
              <span>•</span>
              <span>Créé en {artist.creationDate}</span>
            </div>
          </div>
        </div>

        <div className="artist-content">
          <section className="description-section">
            <h2>À propos</h2>
            <p>{artist.description}</p>
          </section>

          <section className="concerts-section">
            <h2>Prochains concerts</h2>
            <div className="concerts-list">
              {artist.concerts.map((concert, index) => (
                <div key={index} className="concert-card">
                  <div className="concert-date">
                    <span className="date-day">
                      {concert.date.split("/")[0]}
                    </span>
                    <span className="date-month">
                      {new Date(
                        concert.date.split("/").reverse().join("-")
                      ).toLocaleDateString("fr-FR", { month: "short" })}
                    </span>
                  </div>
                  <div className="concert-info">
                    <h3>{concert.venue}</h3>
                    <p>{concert.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
