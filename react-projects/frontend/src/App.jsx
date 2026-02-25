import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./css/App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import AnimeSeasonsPage from "./pages/AnimeSeasonsPage";

// Create a context data for the grandchild component
export const favoritesContext = createContext();
export const navBarSearchQueryContext = createContext();

function App() {
  const [favorites, setFavorites] = useState([]);
  const [navBarSearchQuery, setNavBarSearchQuery] = useState("");

  return (
    <>
      <favoritesContext.Provider value={[favorites, setFavorites]}>
        <navBarSearchQueryContext.Provider value={{ navBarSearchQuery, setNavBarSearchQuery }}>
          <header className="header">
            <NavBar />
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/seasons/:type" element={<AnimeSeasonsPage />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>© 2025 AnimeY - Vincent Yuan.</p>
          </footer>
        </navBarSearchQueryContext.Provider>
      </favoritesContext.Provider>
    </>
  );
}

export default App;
