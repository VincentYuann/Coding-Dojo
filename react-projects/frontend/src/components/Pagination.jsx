function Pagination({ loading, hasNextPage, onLoadMore }) {
    
    if (loading || !hasNextPage) {
        return null; // Don't render anything
    }

    return (
        <button 
            onClick={onLoadMore} 
            className="load-more-button"
            disabled={loading}
        >
            {loading ? "Loading..." : "Load More"}
        </button>
    );
}

export default Pagination;