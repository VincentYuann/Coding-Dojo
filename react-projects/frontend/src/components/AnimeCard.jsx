import { useContext } from "react";
import { favoritesContext } from "../App";

function AnimeCard({ anime }) {
    const [favorites, setFavorites] = useContext(favoritesContext);
    const isFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);

    function handleFavoriteClick() {
        if (isFavorite) {
            setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
        } else {
            setFavorites((previousFavorites) => [...previousFavorites, anime]);
        }
    }

    // Safely handle missing data
    const title = anime.title_english || anime.title || anime.titles[0]?.title || "Untitled";
    const year = anime.aired?.prop?.from?.year || "TbA";
    const score = anime.score || "N/A";
    const type = anime.type || "TV";
    const eps = anime.episodes || "?";

    return (
        <div className="anime-card">
            <div className="anime-poster">
                <a href={anime.url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={anime.images.webp.large_image_url}
                        alt={title}
                    />
                </a>
                <div className="anime-overlay">
                    <button className="favorite" onClick={handleFavoriteClick}>
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>

            <div className="anime-info">
                <h3>{title}</h3>

                <div className="anime-meta">
                    <span className="badge-score">
                        ⭐ {score}
                    </span>
                    <span className="badge-type">
                        {type}
                    </span>
                    <span className="badge-year">
                        📅 {year}
                    </span>
                    <span className="badge-eps">
                        📺 {eps} ep
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AnimeCard;