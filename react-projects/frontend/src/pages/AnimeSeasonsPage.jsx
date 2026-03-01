import QueryWrapper from '../components/QueryWrapper';
import SeasonPicker from '../components/animeSeasonsPage/SeasonPicker';
import AnimeSeasonContent from '../components/animeSeasonsPage/AnimeSeasonContent'

const AnimeSeasonsPage = () => {
    return (
        <main>
            <h1>Explore Seasons</h1>

            <QueryWrapper loadingMessage="Loading season options...">
                <SeasonPicker />
            </QueryWrapper>

            <hr />

            <QueryWrapper loadingMessage="Loading season content...">
                <AnimeSeasonContent />
            </QueryWrapper>
        </main>
    );
};

export default AnimeSeasonsPage;