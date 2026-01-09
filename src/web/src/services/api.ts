const API_BASE = "/api"; // Use local proxy instead of direct API

export interface ApiArtist {
  id: number;
  image: string;
  name: string;
  members: string[];
  creationDate: number;
  firstAlbum: string;
  locations: string;
  concertDates: string;
  relations: string;
}

export interface Location {
  id: number;
  locations: string[];
  dates: string;
}

export interface DateInfo {
  id: number;
  dates: string[];
}

export interface Relation {
  id: number;
  datesLocations: Record<string, string[]>;
}

export interface ApiResponse<T> {
  index: T[];
}

export const apiService = {
  async getArtists(): Promise<ApiArtist[]> {
    const response = await fetch(`${API_BASE}/artists`);
    if (!response.ok) throw new Error("Failed to fetch artists");
    return response.json();
  },

  async getLocations(): Promise<Location[]> {
    const response = await fetch(`${API_BASE}/locations`);
    if (!response.ok) throw new Error("Failed to fetch locations");
    const data: ApiResponse<Location> = await response.json();
    return data.index;
  },

  async getDates(): Promise<DateInfo[]> {
    const response = await fetch(`${API_BASE}/dates`);
    if (!response.ok) throw new Error("Failed to fetch dates");
    const data: ApiResponse<DateInfo> = await response.json();
    return data.index;
  },

  async getRelations(): Promise<Relation[]> {
    const response = await fetch(`${API_BASE}/relation`);
    if (!response.ok) throw new Error("Failed to fetch relations");
    const data: ApiResponse<Relation> = await response.json();
    return data.index;
  },

  async getArtistWithDetails(id: number): Promise<{
    artist: ApiArtist;
    relations: Relation | undefined;
  }> {
    const [artist, relations] = await Promise.all([
      this.getArtists().then((artists) => artists.find((a) => a.id === id)),
      this.getRelations().then((rels) => rels.find((r) => r.id === id)),
    ]);

    if (!artist) throw new Error("Artist not found");

    return { artist, relations };
  },

  async getAllData(): Promise<{
    artists: ApiArtist[];
    relations: Relation[];
  }> {
    const [artists, relations] = await Promise.all([
      this.getArtists(),
      this.getRelations(),
    ]);

    return { artists, relations };
  },
};
