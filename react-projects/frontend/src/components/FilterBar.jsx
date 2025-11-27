import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../App";

function FilterBar({ setFilterParametors }) {
    const [searchQuery, setSearchQuery] = useContext(searchContext);
    const [filterSearchQuery, setFilterSearchQuery] = useState(searchQuery);
    const navigate = useNavigate();

    useEffect(() => {
        setFilterSearchQuery(searchQuery);
    }, [searchQuery]);
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
            
        if (filterSearchQuery.trim()) {
            params.set('q', filterSearchQuery.trim());
        }

        Object.entries(setFilterParametors).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                params.set(key, value);
            }
        });

        navigate(`/search?${params.toString()}`);
    };

    const handleFilterChange = (e) => {
        setFilterParametors(prev => ({
            ...prev,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }));
    };
    
    return (
        <div className="filter-bar">
            <form onSubmit={handleFilterSubmit} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search anime..." 
                    value={filterSearchQuery}
                    onChange={(e) => setFilterSearchQuery(e.target.value)}
                />
                <span className="search-icon">🔍</span>

                <h3>Filter by Type:</h3>
                <div className="filters">
                    <div className="filter-group">
                        <select name="type" onChange={handleFilterChange}>
                            <option disable>Type</option>
                            <option value="tv">Tv</option>
                            <option value="movie">Movie</option>
                            <option value="ova">OVA</option>
                            <option value="ona">ONA</option>
                            <option value="special">Special</option>
                            <option value="tv_special">Tv special</option>
                            <option value="music">Music</option>
                            <option value="cm">CM</option>
                            <option value="pv">PV</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        {/* Might remove this LABEL later not going to lie -------------------------------------------------------- */}
                        <label htmlFor="min-score"></label>
                        <input 
                            id="min-score" 
                            placeholder="Min score" 
                            type="text" 
                            onChange={handleFilterChange}
                        />
                        <label htmlFor="max-score"></label>
                        <input 
                            id="max-score" 
                            placeholder="Max score?" 
                            type="text" 
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    <div className="filter-group">
                        <select name="status" onChange={handleFilterChange}>
                            <option disabled>Status</option>
                            <option value="airing">Airing</option>
                            <option value="complete">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>  
                    </div>
                    
                    <div className="filter-group">
                        <select name="rating" onChange={handleFilterChange}>
                            <option value="">All Ratings</option>
                            <option value="g">All ages</option>
                            <option value="pg">Children</option>
                            <option value="pg13">Teens 13 or older</option>
                            <option value="r17">Violence & profanity</option>
                            <option value="r">Mild Nudity</option>
                            <option value="rx">Hentai</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>
                            <input type="checkbox" name="sfw" onChange={handleFilterChange}/>
                            No Adult Entries
                        </label>
                    </div>

                    <button type="submit" className="apply-filters-button">
                        Filter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FilterBar;