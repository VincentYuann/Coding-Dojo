import { getTopAnimes, searchAnimes, getRecentAnimeRecommendations } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/PaginationCard';

function Home({ onSearch }) {
    const [topAnimes, setTopAnimes] = useState([]); 
    const [recommendedAnimes, setRecommendedAnimes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadPopularAnimes = async () => {
            setLoading(true);
            setError(null);
           
            try {
                const result = await getTopAnimes();
                setTopAnimes(result.data);
            } catch (err) {
                console.error("Error fetching top animes:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
/*
        const getRecentAnimeRecommendations = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getRecentAnimeRecommendations();
                setAnimes(result.data);
            } catch (err) {
                console.error("Error fetching recent anime recommendations:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        getRecentAnimeRecommendations(); 
*/
        loadPopularAnimes(); 
    }, []);

    return (
        <div className="home">
            <div className="messages">
                {loading && <p>Loading anime...</p>}
                <br />
                {error && <p>Error loading anime. Please try again.</p>}
            </div>

            <div className="top-anime-list">
                {!loading && !error && topAnimes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} 
                        />
                )}
            </div>

            <div className="recommended-anime-list">
                <h2>Recent Anime Recommendations</h2>
            </div>

            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
}

export default Home;