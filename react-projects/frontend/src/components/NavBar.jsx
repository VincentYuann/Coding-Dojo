import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
    const [text, setText] =  useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(text ? `/search?q=${text}` : "/search");
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
                    ▼Filter
                </button>
            </form>

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}