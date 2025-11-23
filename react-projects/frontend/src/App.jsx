import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

export const favoritesContext = createContext();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  console.log("Current favorites:", favorites);

  return (
    <>
      <header className="header">
        <NavBar onSearch={setSearchQuery} />
      </header>

      <favoritesContext.Provider value={[favorites, setFavorites]}>
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/search' element={<SearchResults onSearch={searchQuery} />} />
          </Routes>
        </main>
      </favoritesContext.Provider>

      <footer className="footer">
        <p>© 2025 AnimeY - Vincent Yuan.</p>
      </footer>
    </>
  );
}

export default App;