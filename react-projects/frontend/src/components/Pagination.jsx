import { useSearchParams } from "react-router-dom";

function Pagination({ pagination }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        last_visible_page: totalPages,
        has_next_page: hasNextPage,
        current_page: currentPage
    } = pagination;

    // Creates a pagination array with 5 or less indexes
    const getPageNumbers = () => {
        if (totalPages <= 4) {
            // Array.from({ length: 5 }) creates a 5 empty slot array, then
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(1, currentPage - 2); // Prevents number below 1
        let end = Math.min(totalPages, start + 4); // Prevents number over the total pages

        if (end === totalPages) { // If on last page, the visible page buttons are 2 before the end
            start = Math.max(1, totalPages - 4);
        }

        // [start, ..., end]
        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };
    const pages = getPageNumbers();

    // Modifies the url by changing the 'page' parameter 
    const handlePageChange = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set("page", pageNumber);

        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <h3 className="page-info">
                Page {currentPage} of {totalPages}
            </h3>

            <div className="pagination-buttons">
                {/* First Page Button */}
                {pages[0] > 1 &&
                    <button
                        onClick={() => handlePageChange(1)}
                        className="page-button"
                    >
                        ⏪
                    </button>
                }

                {/* Prev Button */}
                {pages[0] > 1 &&
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="page-button"
                    >
                        ◀️
                    </button>
                }

                {/* Page Numbers */}
                {totalPages > 1 && pages.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`page-button ${page === currentPage ? "active" : ""}`}
                        disabled={page === currentPage} // Only disable active page
                        value={page}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                {(totalPages - currentPage > 2) &&
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="page-button"
                    >
                        ▶️
                    </button>
                }

                {/* Last Page Button */}
                {(totalPages - currentPage > 2) &&
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="page-button"
                    >
                        ⏩
                    </button>
                }
            </div>
        </>
    );
}

export default Pagination;