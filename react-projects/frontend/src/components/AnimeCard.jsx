import {useState} from 'react';

function AnimeCard({anime}) {
    const [isFavorite, setIsFavorite] = useState(false);

    function handleFavoriteClick() {
        setIsFavorite(inbox => !inbox);
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