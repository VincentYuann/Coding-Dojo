import { useState, useContext } from "react";
import { searchContext } from "../App";

function FilterBar({ setFilterParametors }) {
    const [searchQuery, setSearchQuery] = useContext(searchContext);
    const [filterSearchQuery, setFilterSearchQuery] = useState(searchQuery);
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const text = filterSearchQuery.trim()
        if (text) {
            setSearchQuery(text);
            navigate(`/search?q=${text}`);
            setFilterSearchQuery(text);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
    };
    
    return (
        <div className="filter-bar">
            <form onSubmit={handleFilterSubmit} className="search-form">
                <input type="text" value={searchQuery}/>
            </form>

            <h3>Filter by Type:</h3>
            
            <div className="filters">
                <select name="type" onChange={handleFilterChange}>
                    <option value="" disabled></option>
                    <option value="tv"></option>
                    <option value="movie">Movie</option>
                </select>
                
                <select name="status" onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="complete">Completed</option>
                    <option value="airing">Airing</option>
                </select>
            </div>
        </div>
    );
}

export default FilterBar;