import AnimeCard from '../components/AnimeCard';
import {useState} from 'react';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const animes = [
        {id: 1, title: "Naruto", release_date: "2005"},
        {id: 2, title: "One Piece", release_date: "1999"},
        {id: 3, title: "Attack on Titan", release_date: "2013"},
        {id: 4, title: "Demon Slayer", release_date: "2019"},
        {id: 5, title: "Jujutsu Kaisen", release_date: "2020"},
        {id: 6, title: "Death Note", release_date: "2006"},
        {id: 7, title: "Fullmetal Alchemist: Brotherhood", release_date: "2009"},
        {id: 8, title: "Hunter x Hunter", release_date: "2011"},
        {id: 9, title: "My Hero Academia", release_date: "2016"},
        {id: 10, title: "Chainsaw Man", release_date: "2022"}
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for animes..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="animes-grid">
                {animes.map(
                    (anime) => 
                        anime.title.toLowerCase().startsWith(searchQuery) &&
                        (<AnimeCard key={anime.id} anime={anime} />)
                )}
            </div>
        </div>
    );
}

export default Home;