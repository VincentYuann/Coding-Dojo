import { useSearchParams } from 'react-router-dom';
import QueryWraper from '../components/QueryWraper';
import SearchResultsContent from '../components/searchPage/SearchContent';
import FilterBar from '../components/searchPage/filterBar/FilterBar';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    return (
        <div className="search">
            <div className="title">
                <h2>Search Results Page</h2>
            </div>

            <FilterBar searchQuery={searchQuery} />

            <div className="search-results">
                <QueryWraper loadingMessage="Loading search results...">
                    <SearchResultsContent searchQueryObject={searchParams} />
                </QueryWraper>
            </div>
        </div>
    )
}

export default SearchResults;