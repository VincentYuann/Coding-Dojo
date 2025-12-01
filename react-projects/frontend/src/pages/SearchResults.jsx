import { useState, useEffect } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import AnimeCard from '../components/AnimeCard';
import FilterBar from '../components/FilterBar';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchAnimes(searchParams);
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
    }, [searchParams]);

    return (
        <div className="search">
            <div className="messages">
                <h2>Search Results Page</h2>
            </div>

            <FilterBar filters={searchQuery} />

            <div className="search-results">
                {loading && <p>Searching...</p>}
                {error && <p className="error-msg">{error}</p>}

                {!loading && !error && animes.length === 0 && (
                    <p>No results found.</p>
                )}

                {!loading && !error && animes.map(anime => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </div>
    )
}

export default SearchResults;