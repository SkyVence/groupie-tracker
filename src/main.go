package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const apiBase = "https://groupietrackers.herokuapp.com/api"

func enableCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func proxyAPIRequest(w http.ResponseWriter, r *http.Request, endpoint string) {
	enableCORS(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	resp, err := http.Get(apiBase + endpoint)
	if err != nil {
		http.Error(w, "Error fetching data", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Error reading response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Path to the React build directory
	buildPath := filepath.Join("web", "dist")

	// Create a file server for the build directory
	fs := http.FileServer(http.Dir(buildPath))

	// API proxy endpoints
	http.HandleFunc("/api/artists", func(w http.ResponseWriter, r *http.Request) {
		proxyAPIRequest(w, r, "/artists")
	})

	http.HandleFunc("/api/locations", func(w http.ResponseWriter, r *http.Request) {
		proxyAPIRequest(w, r, "/locations")
	})

	http.HandleFunc("/api/dates", func(w http.ResponseWriter, r *http.Request) {
		proxyAPIRequest(w, r, "/dates")
	})

	http.HandleFunc("/api/relation", func(w http.ResponseWriter, r *http.Request) {
		proxyAPIRequest(w, r, "/relation")
	})

	// Handle all other routes (static files)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Get the requested path
		path := filepath.Join(buildPath, r.URL.Path)

		// Check if the file exists
		_, err := os.Stat(path)
		if os.IsNotExist(err) {
			// If the file doesn't exist, serve index.html for client-side routing
			http.ServeFile(w, r, filepath.Join(buildPath, "index.html"))
			return
		}

		// Serve the static file
		fs.ServeHTTP(w, r)
	})

	log.Printf("Server starting on http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
