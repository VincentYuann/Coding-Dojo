import { getTopAnimes, getRandomAnimes } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';

function Home({ onSearch }) {
    const [randomAnimes, setRandomAnimes] = useState([]);
    const [topAnimes, setTopAnimes] = useState([]); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchPopularAnimes = async () => {
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

        const fetchRandomAnimes = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getRandomAnimes();
                setRandomAnimes(result);
            } catch (err) {
                console.error("Error fetching recent anime recommendations:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPopularAnimes(); 
        fetchRandomAnimes(); 
    }, []);

    return (
        <div className="home">
            <div className="messages">
                {loading && <p>Loading anime...</p>}
                <br />
                {error && <p>Error loading anime. Please try again.</p>}
            </div>

            <div className="top-anime-list">
                <h2>Top 10 Animes</h2>
                {!loading && !error && topAnimes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} 
                        />
                )}
            </div>

            <div className="random-anime-list">
                <h2>Recent Anime Recommendations</h2>
                {!loading && !error && randomAnimes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} 
                        />
                )}
            </div>

            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
}

export default Home;