import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
    const [text, setText] =  useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        const searchQuery = createSearchParams({q: text}).toString();
        console.log("Navigating to:", `/search?${searchQuery}`);
        e.preventDefault();
        navigate(`/search?${searchQuery}`);
        setText("");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="brand">AnimeY</Link>

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
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}