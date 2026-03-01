import QueryWrapper from '../components/QueryWrapper';
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
                <QueryWrapper loadingMessage="Loading search results...">
                    <SearchResultsContent />
                </QueryWrapper>
            </div>
        </div>
    )
}

export default SearchPage;