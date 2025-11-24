import { useState, useEffect } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import AnimeCard from '../components/AnimeCard';
import FilterBar from '../components/FilterBar';

function SearchResults({ onSearch }) {
    const [animes, setAnimes] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchAnimes(onSearch);
                // Remove duplicate animes based on 'mal_id' with AI solution
                const uniqueResults = [
                    ...new Map(results.map(item => [item.mal_id, item])).values()
                ];
                
                setAnimes(uniqueResults);
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

            <FilterBar />

            <div className="search-results">
                {!loading && !error && animes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} 
                        />
                )}
            </div>
        </div>
    )
}

export default SearchResults;