import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./css/App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/HomePage";
import Favorites from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchPage";
import AnimeSeasons from "./pages/AnimeSeasonsPage";

// Create a context data for the grandchild component
export const favoritesContext = createContext();

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <favoritesContext.Provider value={[favorites, setFavorites]}>
        <header className="header">
          <NavBar />
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/seasons" element={<AnimeSeasonsPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 AnimeY - Vincent Yuan.</p>
        </footer>
      </favoritesContext.Provider>
    </>
  );
}

export default App;
