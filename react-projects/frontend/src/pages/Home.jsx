import { getTopAnimes, searchAnimes, getRecentAnimeRecommendations } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [animes, setAnimes] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Pagination states 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        const loadPopularAnimes = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getTopAnimes();
                setAnimes(result.data);
                setHasNextPage(result.pagination.has_next_page);
                setCurrentPage(1);
            } catch (err) {
                console.error("Error fetching top animes:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadPopularAnimes(); 
    }, []);

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
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for animes..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="animes-grid">
                {loading && <p>Loading anime...</p>}
                {error && <p>Error loading anime. Please try again.</p>}
                {!loading && animes.map(
                    anime => <AnimeCard key={anime.mal_id} anime={anime} />
                )}
            </div>
        </div>
    );
}

export default Home;