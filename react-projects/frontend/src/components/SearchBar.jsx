import { searchAnimes } from '../services/jikanAPI';

function SearchBar({ onSearch }) {
    const handleSearch = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);

        try {
            const searchResults = await searchAnimes(searchQuery);
            setAnimes(searchResults);
        } catch (err) {
            console.error("Error searching animes:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for animes..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
}

export default SearchBar;