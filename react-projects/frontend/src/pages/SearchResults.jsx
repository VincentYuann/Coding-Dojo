import { useState, useEffect, useContext, use } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import { searchContext } from '../App';
import { createQueryUrl } from "../utils/creatQueryUrl";
import AnimeCard from '../components/AnimeCard';
import FilterBar from '../components/FilterBar';

function SearchResults() {
    const [searchQuery] = useContext(searchContext);
    const [filterUrl, setFilterUrl] = useState("");
    const [animes, setAnimes] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchAnimes(filterUrl);
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
    }, [searchQuery, filterUrl]);

    return (
        <div className="search">
            <div className="messages">
                <h2>Search Results Page</h2>
            </div>

            <FilterBar setFilterUrl={setFilterUrl}/>

            <div className="search-results">
                {loading && <p>Searching for animes...</p>}
                {error && <p>Error searching animes. Please try again.</p>}
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