import { getTopAnimes, getRecentAnimeRecommendations } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/PaginationCard';

function Home() {
    const [animes, setAnimes] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Pagination states 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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

    return (
        <div className="home">
            <div className="animes-grid">
                {loading && <p>Loading anime...</p>}
                {error && <p>Error loading anime. Please try again.</p>}
                {!loading && animes.map(
                    anime => <AnimeCard key={anime.mal_id} anime={anime} />
                )}
            </div>

            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
}

export default Home;