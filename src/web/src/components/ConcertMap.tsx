import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Relation } from "../services/api";
import "./ConcertMap.css";

// Fix for default marker icons in React-Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface ConcertLocation {
  location: string;
  dates: string[];
  lat: number;
  lng: number;
}

interface ConcertMapProps {
  artistName: string;
  relations: Relation;
}

// Simple geocoding cache to avoid repeated API calls
const geocodeCache: Record<string, { lat: number; lng: number }> = {};

async function geocodeLocation(
  location: string
): Promise<{ lat: number; lng: number } | null> {
  // Check cache first
  if (geocodeCache[location]) {
    return geocodeCache[location];
  }

  try {
    // Using Nominatim (OpenStreetMap) for free geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "GroupieTracker/1.0",
        },
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      geocodeCache[location] = coords;
      return coords;
    }
  } catch (error) {
    console.error("Geocoding error for", location, error);
  }

  return null;
}

function ConcertMap({ artistName, relations }: ConcertMapProps) {
  const [locations, setLocations] = useState<ConcertLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      const locs: ConcertLocation[] = [];

      for (const [loc, dates] of Object.entries(relations.datesLocations)) {
        const formatted = loc.replace(/-/g, ", ").replace(/_/g, " ");
        const coords = await geocodeLocation(formatted);

        if (coords) {
          locs.push({
            location: formatted,
            dates,
            ...coords,
          });
        }

        // Add small delay to respect rate limits
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setLocations(locs);
      setLoading(false);
    }

    loadLocations();
  }, [relations]);

  if (loading) {
    return (
      <div className="map-loading">
        <p>Loading concert locations on map...</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="map-error">
        <p>No locations found for mapping</p>
      </div>
    );
  }

  // Calculate center of all locations
  const centerLat =
    locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const centerLng =
    locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

  return (
    <div className="concert-map-container">
      <h2>Concert Locations Map</h2>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={3}
        className="concert-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="map-popup">
                <h3>{artistName}</h3>
                <p className="popup-location">📍 {loc.location}</p>
                <div className="popup-dates">
                  <strong>Dates:</strong>
                  <ul>
                    {loc.dates.map((date, i) => (
                      <li key={i}>{date}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ConcertMap;
