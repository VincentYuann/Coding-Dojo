import { searchAnimes } from '../../services/jikanAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import AnimeCard from '../AnimeCard'
import Pagination from '../Pagination';

function SearchResultsContent({ searchQueryObject }) {
    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['animes', String(searchQueryObject)],
        queryFn: () => searchAnimes(searchQueryObject)
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
    )
}

export default SearchResultsContent