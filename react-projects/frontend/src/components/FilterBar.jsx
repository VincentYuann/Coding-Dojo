// src/components/FilterBar.jsx

function FilterBar() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div className="filter-bar"> {/* 1. Use className */}
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" />
            </form>

            <h3>Filter by Type:</h3>
            
            {/* Option 1: TV */}
            <label htmlFor="type-tv"> {/* 2. Use htmlFor */}
                <input 
                    type="radio" 
                    id="type-tv" 
                    name="animeType" // Same name groups them together
                    value="tv"
                    checked="Yo"
                />
                TV Series
            </label>

            {/* Option 2: Movie */}
            <label htmlFor="type-movie">
                <input 
                    type="radio" 
                    id="type-movie" 
                    name="animeType" 
                    value="movie"
                    checked="Yo"
                />
                Movie
            </label>

            {/* Option 3: Reset / All */}
            <label htmlFor="type-all">
                <input 
                    type="radio" 
                    id="type-all" 
                    name="animeType" 
                    value=""
                    checked="Yo"
                />
                All Types
            </label>
        </div>
    );
}

export default FilterBar;