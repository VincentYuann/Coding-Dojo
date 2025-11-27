import { useState, useEffect, useContext } from 'react';
import { searchAnimes } from '../services/jikanAPI';
import { searchContext } from '../App';
import { useSearchParams } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import FilterBar from '../components/FilterBar';

function SearchResults() {
    const [animes, setAnimes] = useState([]);
    const [searchQuery] = useContext(searchContext);
    const [filterParametors, setFilterParametors] = useState({
        type: "",
        min_score: "",
        max_sore: "",
        status: "",
        rating: "",
        sfw: "", //Filter out Adult entries
        genres: [], //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        genres_exclude: [], //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        order_by: "",
        sort: "",
        letter: "",
        start_date: "",
        end_date: ""
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchAnimes(searchQuery, filterParametors.page, filterParametors);
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
    }, [searchQuery]);

    return (
        <div className="search">
            <div className="messages">
                <h2>Search Results Page</h2>
            </div>

            <FilterBar setFilterParametors={setFilterParametors}/>

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