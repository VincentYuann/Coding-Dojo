import { getCurrentSeason, getUpcomingSeasons, getSeason } from '../../services/animeService';
import AnimeCard from '../AnimeCard';
import { Pagination } from '../../services/paginationService';

function AnimeSeasonContent({ type, year, season }) {
    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['season', type, year, season],
        queryFn: () => {
            if (type === 'current') {
                return getCurrentSeason();
            }
            else if (type === 'upcoming') {
                return getUpcomingSeasons();
            }
            else if (type === 'specific') {
                return getSeason(year, season);
            }
        },
    });

    return (
        <>
            <div className='search-results-grid'>
                {(animes.length === 0) ?
                    <div className='page-info'>
                        No results found, try again.
                    </div>
                    :
                    animes.map(anime => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
            </div>

            <div className='pagination-container'>
                <Pagination pagination={pagination} />
            </div>
        </>
    );
}

export default AnimeSeasonContent;