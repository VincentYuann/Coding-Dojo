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
            <div className="top-animes-section">
                <div className="messages">
                    {loading && <p>Loading anime...</p>}
                    <br />
                    {error && <p>Error loading anime. Please try again.</p>}
                </div>

                {!loading && topAnimes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} />
                )
                }
            </div>

            <div className="recommended-animes-section">
                <div className="messages">
                    <h2>Recent Anime Recommendations</h2>
                    {loading && <p>Loading recommendations...</p>}
                    {error && <p>Error loading recommendations. Please try again.</p>}
                </div>
            </div>

            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
}

export default Home;