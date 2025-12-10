import { Link } from "react-router-dom";
import { artists } from "../data/artists";
import "../App.css";

function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Groupie Tracker</h1>
        <p>By Antoine Mathié and Paolo Antonini kaboom</p>
      </header>

      <div className="artists-grid">
        {artists.map((artist) => (
          <Link
            to={`/artist/${artist.id}`}
            key={artist.id}
            className="artist-card"
          >
            <div className="artist-image">
              <img src={artist.image} alt={artist.name} />
            </div>
            <div className="artist-info">
              <h2>{artist.name}</h2>
              <p>
                {artist.members} membres • Créé en {artist.creationDate}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
