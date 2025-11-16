import {useState} from 'react';

function AnimeCard({anime}) {
    const [isFavorite, setIsFavorite] = useState(false);

    function handleFavoriteClick() {
        setIsFavorite(inbox => !inbox);
    }

    return (
    <div className="anime-card">
        <div className="anime-poster">
            <img src={anime.url} alt={anime.title} />
            <div className="anime-overlay">
                <button className="favorite" onClick={handleFavoriteClick}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
        <div className="anime-info">
            <h3>{anime.title}</h3> 
            <p>{anime.release_date}</p>
        </div>
    </div>
  );
}

export default AnimeCard;