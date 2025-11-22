import { getTopAnimes, searchAnimes, getRecentAnimeRecommendations } from '../services/jikanAPI';
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/PaginationCard';

function Home({ onSearch }) {
    const [animes, setAnimes] = useState([]);
    const [topAnimes, setTopAnimes] = useState([]); 
    const [recommendedAnimes, setRecommendedAnimes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const handleSearch = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);

        try {
            const searchResults = await searchAnimes(onSearch);
            setAnimes(searchResults);
        } catch (err) {
            console.error("Error searching animes:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadPopularAnimes = async () => {
            setLoading(true);
            setError(null);
           
            try {
                const result = await getTopAnimes();
                setAnimes(result.data);
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
            <div className="animes-grid">
                {loading && <p>Loading anime...</p>}
                {error && <p>Error loading anime. Please try again.</p>}
                {!loading && animes
                    .filter(anime => {
                        if (!onSearch) return true;

                        const titleMatch = anime.title_english || anime.title || anime.titles[0].title;
                        return titleMatch.toLowerCase().startsWith(onSearch.toLowerCase());
                    })
                    .map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)
                }
            </div>

            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
}

export default Home;