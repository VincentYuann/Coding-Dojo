import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";

function AnimeCard({ anime }) {
    const { user } = useAuth();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);
    const [instantUI, setInstantUI] = useState(isFavorite)

    function handleFavoriteClick() {
        if (!user) return toast("Login to save animes.", { icon: "🔒", });

        if (isFavorite) {
            addFavorite(anime.mal_id, {
                onError: () => {
                    // 3. Rollback if it fails!
                    setInstantUI(false);
                }
            });
            setInstantUI(false);
            console.log("Removed", anime.title_english);
        } else {
            addFavorite(anime.mal_id, {
                onError: () => {
                    // 3. Rollback if it fails!
                    setInstantUI(false);
                }
            });
            setInstantUI(true);
            console.log("Addd", anime.title_english);
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
                        {instantUI ? "❤️" : "🤍"}
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