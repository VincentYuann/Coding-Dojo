import QueryWraper from '../components/QueryWraper';
import SearchResultsContent from '../components/searchPage/SearchContent';
import FilterBar from '../components/searchPage/FilterBar';

function SearchPage() {
    return (
        <div className="search">
            <div className="title">
                <h2>Search Results Page</h2>
            </div>

            <FilterBar />

            <div className="search-results">
                <QueryWraper loadingMessage="Loading search results...">
                    <SearchResultsContent />
                </QueryWraper>
            </div>
        </div>
    )
}

export default SearchPage;