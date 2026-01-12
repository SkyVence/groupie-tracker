# Groupie Tracker

[![Build](https://github.com/SkyVence/groupie-tracker/actions/workflows/docker-build.yml/badge.svg)](https://github.com/SkyVence/groupie-tracker/actions/workflows/docker-build.yml)
[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](https://github.com/SkyVence/groupie-tracker/pkgs/container/groupie-tracker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go](https://img.shields.io/badge/Go-1.25-00ADD8?logo=go)](https://golang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)

A modern web application for tracking music artists, their concert locations, and tour dates. Built with a Go backend and React frontend.

## 📸 Screenshots

*Coming soon*

## ✨ Features

- 🎵 **Artist Directory** - Browse through a collection of artists with detailed information
- 🗺️ **Interactive Maps** - View concert locations on an interactive Leaflet map
- 🔍 **Smart Search** - Search artists by name, members, locations, and more
- 🎛️ **Advanced Filters** - Filter by creation year, album release, member count, and concert locations
- 📱 **Responsive Design** - Fully responsive UI with mobile-friendly drawer navigation
- ⚡ **Fast & Modern** - Built with Vite, React 19, and TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **TailwindCSS** - Styling
- **React Router 7** - Client-side routing
- **Leaflet** - Interactive maps

### Backend
- **Go** - API server
- **Net/HTTP** - HTTP server and routing

## 📋 Prerequisites

- [Go 1.25+](https://golang.org/dl/)
- [Node.js 20+](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) (optional)

## 🚀 Getting Started

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SkyVence/groupie-tracker.git
   cd groupie-tracker
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   bun install  # or npm install
   ```

3. **Build the frontend**
   ```bash
   bun run build  # or npm run build
   ```

4. **Run the backend**
   ```bash
   cd ../backend
   go run main.go
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Development with Hot Reload

For frontend development with hot reload:

```bash
# Terminal 1 - Frontend dev server
cd frontend
bun run dev

# Terminal 2 - Backend server
cd backend
go run main.go
```

### Docker

Build and run with Docker:

```bash
docker build -t groupie-tracker .
docker run -p 8080:8080 groupie-tracker
```

## 📁 Project Structure

```
groupie-tracker/
├── backend/
│   ├── main.go          # Go server with API proxy
│   └── go.mod           # Go module definition
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── ConcertMap.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── pages/       # Page components
│   │   │   ├── Home.tsx
│   │   │   └── ArtistDetail.tsx
│   │   ├── services/    # API services
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── LICENSE
└── README.md
```

## 🔌 API Endpoints

The backend proxies requests to the Groupie Trackers API:

| Endpoint | Description |
|----------|-------------|
| `GET /api/artists` | List all artists |
| `GET /api/locations` | List all concert locations |
| `GET /api/dates` | List all concert dates |
| `GET /api/relation` | Get artist-location-date relations |

## 🌐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Server port |

## 👥 Authors

- **Antoine Mathié** - [GitHub](https://github.com/SkyVence)
- **Paolo Antonini**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groupie Trackers API](https://groupietrackers.herokuapp.com/api) for providing the artist data
- [Leaflet](https://leafletjs.com/) for the mapping library
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework