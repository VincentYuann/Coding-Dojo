import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { navBarSearchQueryContext } from "../App";

export default function NavBar() {
    const { setNavBarSearchQuery } = useContext(navBarSearchQueryContext);
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchQuery = String(createSearchParams({ q: text }));
        navigate(text ? `/search?${searchQuery}` : `/search`);
        setNavBarSearchQuery(text);
        setText("");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="brand">
                AnimeY
            </Link>

            <form onSubmit={handleSubmit} className="search-form">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search for animes..."
                    className="search-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="button" className="filter-button" onClick={handleSubmit}>
                    Search
                </button>
            </form>

            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/seasons/current" className="nav-link">
                    Seasons
                </Link>
                <Link to="/favorites" className="nav-link">
                    Favorites
                </Link>
            </div>
        </nav>
    );
}
