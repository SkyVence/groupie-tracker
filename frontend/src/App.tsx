import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ArtistDetail from "./pages/ArtistDetail";

function Navigation() {
  return (
    <nav className="flex-shrink-0 bg-dark-800/80 backdrop-blur-md border-b border-dark-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-14 items-center">
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-accent transition-colors"
          >
            Groupie Tracker
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col bg-dark-900">
        <Navigation />
        <div className="flex-1 min-h-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
