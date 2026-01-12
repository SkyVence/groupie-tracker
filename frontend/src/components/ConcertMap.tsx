import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React-Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface ConcertMapProps {
  location: string;
  date: string;
}

interface Coords {
  lat: number;
  lng: number;
}

const geocodeCache: Record<string, Coords> = {};

async function geocodeLocation(location: string): Promise<Coords | null> {
  if (geocodeCache[location]) {
    return geocodeCache[location];
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
      {
        headers: {
          "User-Agent": "GroupieTracker/1.0",
        },
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      const coords: Coords = {
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

// Component to handle map view changes
function MapUpdater({ coords }: { coords: Coords }) {
  const map = useMap();
  const prevCoordsRef = useRef<Coords | null>(null);

  useEffect(() => {
    if (
      !prevCoordsRef.current ||
      prevCoordsRef.current.lat !== coords.lat ||
      prevCoordsRef.current.lng !== coords.lng
    ) {
      map.flyTo([coords.lat, coords.lng], 10, {
        duration: 1.5,
      });
      prevCoordsRef.current = coords;
    }
  }, [coords, map]);

  return null;
}

function ConcertMap({ location, date }: ConcertMapProps) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadLocation() {
      setLoading(true);
      setError(false);

      const result = await geocodeLocation(location);

      if (!cancelled) {
        if (result) {
          setCoords(result);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    }

    loadLocation();

    return () => {
      cancelled = true;
    };
  }, [location]);

  if (loading) {
    return (
      <div className="h-[400px] bg-dark-800 border border-dark-500 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (error || !coords) {
    return (
      <div className="h-[400px] bg-dark-800 border border-dark-500 rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>Impossible de localiser</p>
          <p className="text-sm mt-1">{location}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-xl overflow-hidden border border-dark-500 animate-fadeIn">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={10}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater coords={coords} />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>
            <div className="p-1">
              <p className="font-bold text-gray-900">{location}</p>
              <p className="text-gray-600 text-sm mt-1">{date}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default ConcertMap;
