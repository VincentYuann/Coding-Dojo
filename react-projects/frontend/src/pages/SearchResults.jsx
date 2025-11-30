import { useState, useEffect } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import AnimeCard from '../components/AnimeCard';
import FilterBar from '../components/FilterBar';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const currentQueryFilters = Object.fromEntries([...searchParams]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchAnimes(currentQueryFilters);
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

            <FilterBar filters={currentQueryFilters}/>

            <div className="search-results">
                {loading && <p>Searching...</p>}
                {error && <p className="error-msg">{error}</p>}

                {!loading && !error && animes.length === 0 && (
                    <p>No results found. Try adjusting filters.</p>
                )}

                {!loading && !error && animes.map(anime => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </div>
    )
}

export default SearchResults;