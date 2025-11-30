import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { createQueryUrl } from '../utils/createQueryUrl';

export default function NavBar() {
    const [text, setText] =  useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const queryUrl = createQueryUrl({q: text});
        navigate(text ? `/search?${queryUrl}` : "/search");
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