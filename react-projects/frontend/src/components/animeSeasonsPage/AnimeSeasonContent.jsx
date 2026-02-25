import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from 'react-router-dom';
import { getCurrentSeason, getUpcomingSeasons, getSeason } from '../../services/animeService';
import AnimeCard from '../AnimeCard';
import Pagination from '../Pagination';

function AnimeSeasonContent() {
    const { type } = useParams();
    const [searchParams] = useSearchParams();

    const seasonFilters = {
        year: searchParams.get('year') || '',
        season: searchParams.get('season') || '',
        page: searchParams.get('page') || ''
    }

    const { year, season, page } = seasonFilters;

    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['season', type, seasonFilters],
        queryFn: () => {
            if (type === 'current' || type === '') return getCurrentSeason(page);
            if (type === 'upcoming') return getUpcomingSeasons(page);
            if (type === 'specific' && year && season) return getSeason(year, season, page);
        },
    });

    // Prevents anime duplications
    const uniqueAnimeList = [
        ...new Map(animes.map(item => [item.mal_id, item])).values()
    ];

    return (
        <>
            <div className='search-results-grid'>
                {(uniqueAnimeList.length === 0) ?
                    <div className='page-info'>
                        No results found, try again.
                    </div>
                    :
                    uniqueAnimeList.map(anime => (
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