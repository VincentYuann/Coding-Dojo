import { useState, useEffect } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import AnimeCard from '../components/AnimeCard';

function SearchResults({ onSearch }) {
    const [animes, setAnimes] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const searchResults = await searchAnimes(onSearch);
                setAnimes(searchResults);
            } catch (err) {
                console.error("Error searching animes:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [onSearch]);

  
    return (
        <div className="search">
            <div className="messages">
                <h2>Search Results Page</h2>
                {loading && <p>Searching for animes...</p>}
                <br />
                {error && <p>Error searching animes. Please try again.</p>}
            </div>

            <div className="filters">
                {/* Future filter options can be added here */}
            </div>

            <div className="search-results">
                {!loading && !error && animes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} />
                )}
            </div>
        </div>
    )
}

export default SearchResults;