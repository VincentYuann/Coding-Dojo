import { getTopAnimes, getRandomAnimes } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';

function Home() {
    const [randomAnimes, setRandomAnimes] = useState([]);
    const [topAnimes, setTopAnimes] = useState([]); 

    const [loading1, setLoading1 ] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchPopularAnimes = async () => {
            setLoading1(true);
            setError(null);
           
            try {
                const result = await getTopAnimes();
                setTopAnimes(result.data);
            } catch (err) {
                console.error("Error fetching top animes:", err);
                setError(err);
            } finally {
                setLoading1(false);
            }
        };

        const fetchRandomAnimes = async () => {
            setLoading2(true);
            setError(null);

            try {
                const result = await getRandomAnimes();
                setRandomAnimes(result);
            } catch (err) {
                console.error("Error fetching recent anime recommendations:", err);
                setError(err);
            } finally {
                setLoading2(false);
            }
        };
    
        fetchPopularAnimes(); 
        fetchRandomAnimes(); 
    }, []);

    return (
        <div className="home">
            <div className="messages">
                <h2>Home Page</h2>
            </div>

            <div className="top-anime-list">
                <h2>Top 10 Animes</h2>
                {loading1 && <p>Loading anime...</p>}
                {error && <p>Error loading anime. Please try again.</p>}
                {!loading1 && !error && topAnimes.map(
                    anime => 
                        <AnimeCard 
                            key={anime.mal_id} 
                            anime={anime} 
                        />
                )}
            </div>

            <div className="random-anime-list">
                <h2>Random Animes</h2>
                {loading2 && <p>Loading anime...</p>}
                {error && <p>Error loading anime. Please try again.</p>}
                {!loading2 && !error && randomAnimes.map(
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