import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function NavBar({ onSearch }) {
    return (
        <nav className="navbar">
            <Link to="/" className="brand">AnimeY</Link>

            <SearchBar onSearch={onSearch} />

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;