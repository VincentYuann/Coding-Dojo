import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

// Create a context data for the grandchild component
export const favoritesContext = createContext();
export const searchContext = createContext();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <searchContext.Provider value={[searchQuery, setSearchQuery]}>
        <header className="header">
          <NavBar />
        </header>

        <favoritesContext.Provider value={[favorites, setFavorites]}>
          <main className="main-content">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/search' element={<SearchResults />} />
            </Routes>
          </main>
        </favoritesContext.Provider>
      </searchContext.Provider>

      <footer className="footer">
        <p>© 2025 AnimeY - Vincent Yuan.</p>
      </footer>
    </>
  );
}

export default App;