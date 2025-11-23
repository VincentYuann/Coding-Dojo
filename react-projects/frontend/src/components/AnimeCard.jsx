import { useContext } from 'react';
import { favoritesContext } from '../App';

function AnimeCard({ anime }) {
    const [favorites, setFavorites] = useContext(favoritesContext);

    const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id);

    function handleFavoriteClick() {
        if (isFavorite) {
            // Remove from favorites
            setFavorites(favorites.filter(fav => fav.mal_id !== anime.mal_id));
        } else {
            // Add the new 'anime' to favorites
            setFavorites(previousFavorites => [...previousFavorites, anime]);
        }
    }

    return (
    <div className="anime-card">
        <div className="anime-poster">
            <a href={anime.url} target="_blank" rel="noopener noreferrer">
                <img src={anime.images.webp.large_image_url} alt={anime.title_english} />
            </a>
            <div className="anime-overlay">
                <button className="favorite" onClick={handleFavoriteClick}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>

        <div className="anime-info">
            <h3>{anime.title_english || anime.title || anime.titles[0].title}</h3> 
            <p>Aired: {anime.aired.prop.from.year}</p>
            <p>Score: {anime.score}⭐</p>
            <p>Type: {anime.type}</p>
        </div>
    </div>
  );
}

export default AnimeCard;