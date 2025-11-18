import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="brand">AnimeY</Link>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;