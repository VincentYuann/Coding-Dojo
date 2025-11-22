import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function NavBar({ onSearch }) {
    return (
        <nav className="navbar">
            <Link to="/" className="brand">AnimeY</Link>

            <div className="search-bar">
                <SearchBar onSearch={onSearch} />
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;