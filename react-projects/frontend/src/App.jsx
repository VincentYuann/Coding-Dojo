import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./css/App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";

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
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<SearchResults />} />
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
