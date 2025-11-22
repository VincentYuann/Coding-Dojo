import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [text, setText] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        onSearch(text);
    };
    
    return (
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for animes..." 
                className="search-input" 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
}

export default SearchBar;