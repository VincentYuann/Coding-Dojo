import { searchAnimes } from '../../services/jikanAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import AnimeCard from '../AnimeCard'
import Pagination from '../Pagination';

function SearchResultsContent({ searchQueryObject }) {
    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['animes', searchQueryObject.toString()],
        queryFn: () => searchAnimes(searchQueryObject)
    });

    // Prevents anime duplications
    const uniqueAnimeList = [
        ...new Map(animes.map(item => [item.mal_id, item])).values()
    ];

    return (
        <>
            <div className='search-results'>
                {!uniqueAnimeList ? "No results found, try again." :
                    uniqueAnimeList.map(anime => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
            </div>

            <div className='pagination'>
                <Pagination pagination={pagination} />
            </div>
        </>
    )
}

export default SearchResultsContent