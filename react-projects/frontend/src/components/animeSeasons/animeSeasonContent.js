import { useSuspenseQuery } from '@tanstack/react-query';
import { animeSeasons } from '../../services/animeService';
import AnimeCard from '../AnimeCard';

function AnimeSeasonContent() {
    const seasons = animeSeasons.getSeasonList();
    const currentSeason = animeSeasons.getCurrentSeason();
    const upcomingSeasons = animeSeasons.getUpcomingSeasons();

    return (
        <>

        </>
    );
}

export default AnimeSeasonContent;