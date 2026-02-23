import QueryWraper from '../components/QueryWraper';
import SeasonPicker from '../components/animeSeasonsPage/SeasonPicker';
import AnimeSeasonContent from '../components/animeSeasonsPage/AnimeSeasonContent'

const AnimeSeasonsPage = () => {
    return (
        <main>
            <h1>Explore Seasons</h1>

            <QueryWraper loadingMessage="Loading season options...">
                <SeasonPicker />
            </QueryWraper>

            <hr />

            <QueryWraper loadingMessage="Loading season content...">
                <AnimeSeasonContent />
            </QueryWraper>
        </main>
    );
};

export default AnimeSeasonsPage;