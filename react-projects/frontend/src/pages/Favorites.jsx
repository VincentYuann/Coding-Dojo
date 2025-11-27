import { useContext } from "react";
import { favoritesContext } from "../App";
import AnimeCard from "../components/AnimeCard";

function Favorites() {
    const [favorites] = useContext(favoritesContext);

    return (
        <div className="favorites">
            <div className="messages">  
                <h2>Favorites Page</h2>

            </div>

            <div className="favorite-anime-list">
                {favorites.length === 0 ? (
                    <p>No Animes in your list</p>
                ) : (
                    favorites.map(anime => 
                        <AnimeCard
                            key={anime.mal_id} 
                            anime={anime}
                         />
                    )
                    )
                }
            </div>
        </div>
    );
}

export default Favorites;