import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService, type ApiArtist, type Relation } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import "../App.css";

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

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2>Chargement...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Groupie Tracker</h1>
        <p>By Antoine Mathié and Paolo Antonini</p>
      </header>

      <SearchBar artists={artists} relations={relations} />
      <Filters
        artists={artists}
        relations={relations}
        onFilterChange={setFilteredArtists}
      />

      <div className="artists-grid">
        {filteredArtists.map((artist) => (
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
                {artist.members.length} membres • Créé en {artist.creationDate}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
