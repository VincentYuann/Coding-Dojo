import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <header className="header">
        <NavBar onSearch={setSearchQuery} />
      </header>

      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search' element={<SearchResults onSearch={searchQuery} />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2025 AnimeY - Vincent Yuan.</p>
      </footer>
    </>
  );
}

export default App;