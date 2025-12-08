package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Path to the React build directory
	buildPath := filepath.Join("web", "dist")

	// Create a file server for the build directory
	fs := http.FileServer(http.Dir(buildPath))

	// Handle all routes
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
