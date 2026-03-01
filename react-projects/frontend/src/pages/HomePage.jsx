import TopAnimeGrid from "../components/homePage/TopAnimeGrid";
import RandomAnimeGrid from "../components/homePage/RandomAnimeGrid"
import QueryWrapper from "../components/QueryWrapper";

function HomePage() {
    return (
        <div className="home">
            <div className="title">
                <h2>Home Page</h2>
            </div>

            <div className="top-anime-list">
                <h2>Top Animes</h2>
                <QueryWrapper loadingMessage="Loading top 10 animes...">
                    <TopAnimeGrid />
                </QueryWrapper>
            </div>

            <div className="random-anime-list">
                <h2>Random Animes</h2>
                <QueryWrapper loadingMessage="Loading random animes...">
                    <RandomAnimeGrid />
                </QueryWrapper>
            </div>
        </div>
    );
}

export default HomePage;
