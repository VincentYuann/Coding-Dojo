import TopAnimeSection from "../components/home/TopAnimeSection";
import RandomAnimeSection from "../components/home/RandomAnimeSection"
import QueryWrapper from "../components/QueryWraper";

function Home() {
    return (
        <div className="home">
            <div className="title">
                <h2>Home Page</h2>
            </div>

            <div className="top-anime-list">
                <h2>Top 10 Animes</h2>
                <QueryWrapper>
                    <TopAnimeSection />
                </QueryWrapper>
            </div>

            <div className="random-anime-list">
                <h2>Random Animes</h2>
                <QueryWrapper>
                    <RandomAnimeSection />
                </QueryWrapper>
            </div>
        </div>
    );
}

export default Home;
