# 🎸 Groupie Tracker - Guide d'utilisation

## 📋 Description

Groupie Tracker est une application React moderne qui référence des artistes musicaux avec leurs informations, classements, biographies, albums et concerts à venir.

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
cd src/web
bun install
# ou
npm install
```

### Lancer le serveur de développement

```bash
bun run dev
# ou
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🎨 Fonctionnalités

### Actuellement disponibles

- ✅ **Grille d'artistes** - Affichage en cartes avec design moderne
- ✅ **Recherche** - Recherche par nom d'artiste ou biographie
- ✅ **Filtres par genre** - Filtrage dynamique des artistes
- ✅ **Modal de détails** - Vue détaillée de chaque artiste avec concerts
- ✅ **Design responsive** - Adapté mobile, tablette et desktop
- ✅ **Données mockées** - Données de test pour le développement

### À venir

- 🔄 **Intégration API** - Connexion à l'API de l'école
- 🔄 **Pagination** - Pour gérer de grandes quantités d'artistes
- 🔄 **Favoris** - Marquer ses artistes préférés
- 🔄 **Carte interactive** - Visualiser les concerts sur une carte

## 📂 Structure du projet

```
src/web/src/
├── components/
│   ├── ArtistCard.tsx      # Carte d'artiste
│   ├── ArtistCard.css      # Styles de la carte
│   ├── ArtistModal.tsx     # Modal de détails
│   └── ArtistModal.css     # Styles du modal
├── types/
│   └── Artist.ts           # Types TypeScript
├── data/
│   └── mockArtists.ts      # Données mockées
├── App.tsx                 # Composant principal
├── App.css                 # Styles globaux
├── main.tsx                # Point d'entrée
└── index.css               # Styles de base
```

## 🔌 Intégration de l'API

### Étape 1 : Créer un service API

Créez un fichier `src/services/api.ts` :

```typescript
import { Artist } from '../types/Artist';

const API_BASE_URL = 'https://votre-api.com'; // URL de l'API de l'école

export const fetchArtists = async (): Promise<Artist[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/artists`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des artistes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

export const fetchArtistById = async (id: string): Promise<Artist> => {
  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'artiste');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};
```

### Étape 2 : Utiliser l'API dans App.tsx

Remplacez les données mockées par un appel API :

```typescript
import { useState, useEffect } from "react";
import { fetchArtists } from "./services/api";

function App() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        setLoading(true);
        const data = await fetchArtists();
        setArtists(data);
      } catch (err) {
        setError('Impossible de charger les artistes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  // Reste du code...
}
```

### Étape 3 : Adapter les types si nécessaire

Si le format de l'API diffère, ajustez les types dans `types/Artist.ts` ou créez une fonction de transformation :

```typescript
// Si l'API retourne un format différent
export const transformApiArtist = (apiData: any): Artist => {
  return {
    id: apiData.id,
    name: apiData.name || apiData.artistName,
    image: apiData.imageUrl || apiData.photo,
    rank: apiData.rank || apiData.position,
    bio: apiData.biography || apiData.bio,
    firstAlbum: apiData.firstAlbumDate,
    lastAlbum: apiData.latestAlbum,
    genres: apiData.genres || [],
    upcomingConcerts: apiData.concerts?.map(transformConcert) || [],
    followers: apiData.followersCount
  };
};
```

## 🎨 Personnalisation du design

### Couleurs principales

Les couleurs peuvent être modifiées dans les fichiers CSS :

- **Gradient principal** : `#667eea` → `#764ba2`
- **Gradient secondaire** : `#f093fb` → `#f5576c`
- **Fond** : `#0f0f0f` → `#1a1a1a`

### Modifier les styles

Tous les styles sont dans les fichiers `.css` correspondants. Vous pouvez facilement :

- Changer les couleurs des gradients
- Modifier les espacements
- Ajuster les tailles de police
- Personnaliser les animations

## 📱 Responsive Design

L'application est optimisée pour :

- 📱 **Mobile** : < 768px (1 colonne)
- 📱 **Tablette** : 768px - 1024px (2-3 colonnes)
- 💻 **Desktop** : > 1024px (3-4 colonnes)

## 🔧 Technologies utilisées

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **CSS3** - Styles modernes avec gradients et animations
- **Bun** - Runtime JavaScript moderne (ou npm)

## 📝 Format des données

### Structure Artist

```typescript
interface Artist {
  id: string;                    // ID unique
  name: string;                  // Nom de l'artiste
  image: string;                 // URL de l'image
  rank: number;                  // Classement
  bio: string;                   // Biographie
  firstAlbum: string;            // Date du 1er album
  lastAlbum: string;             // Date du dernier album
  genres: string[];              // Liste des genres
  upcomingConcerts: Concert[];   // Concerts à venir
  followers?: number;            // Nombre de followers (optionnel)
}
```

### Structure Concert

```typescript
interface Concert {
  id: string;        // ID unique
  city: string;      // Ville
  country: string;   // Pays
  venue: string;     // Salle/lieu
  date: string;      // Date (format ISO)
}
```

## 🐛 Debugging

### Problèmes courants

1. **Les images ne s'affichent pas**
   - Vérifier les URLs des images
   - S'assurer que les CORS sont configurés sur l'API

2. **L'API ne répond pas**
   - Vérifier l'URL de l'API
   - Vérifier la connexion réseau
   - Consulter la console pour les erreurs

3. **Styles cassés**
   - Vérifier que tous les fichiers CSS sont importés
   - Vider le cache du navigateur

## 📦 Build pour la production

```bash
bun run build
# ou
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 🤝 Contribution

Pour ajouter de nouvelles fonctionnalités :

1. Créer un nouveau composant dans `components/`
2. Ajouter les types nécessaires dans `types/`
3. Importer et utiliser dans `App.tsx`
4. Styliser avec un fichier CSS dédié

## 📄 Licence

Ce projet est créé dans le cadre d'un projet scolaire.

---

**Bon développement ! 🚀**