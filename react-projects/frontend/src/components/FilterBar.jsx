import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../App";

function FilterBar({ setFilterParametors }) {
    const [searchQuery, setSearchQuery] = useContext(searchContext);
    const [filterSearchQuery, setFilterSearchQuery] = useState(searchQuery);
    const [filterParametors, setFilterParametors] = useState({
        q: searchQuery,
        type: "",
        min_score: "",
        max_sore: "",
        status: "",
        rating: "",
        sfw: false, //Filter out Adult entries
        genres: [], //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        genres_exclude: [], //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        order_by: "",
        sort: "",
        letter: "",
        start_date: "",
        end_date: "",
        page: 1
    });
    const navigate = useNavigate();

    // Sync local filter search query with global search query
    useEffect(() => {
        setFilterSearchQuery(searchQuery);
    }, [searchQuery]);
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        Object.entries(setFilterParametors).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                params.append(key, value);
            }
        });
        
        console.log(params.toString());
        if (filterSearchQuery.trim()) {
            setSearchQuery(filterSearchQuery);
            navigate(`/search?q=${filterSearchQuery}${params.toString()}`);
        } else {
            setSearchQuery("");
            navigate(`/search${params.toString()}`);
        }
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
                <div className="filter-search-input">
                    <input 
                        type="text" 
                        placeholder="Search anime..." 
                        value={filterSearchQuery}
                        onChange={(e) => setFilterSearchQuery(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <h3>Filter by Type:</h3>
                <div className="filters">
                    <div className="filter-group">
                        <select name="type" onChange={handleFilterChange}>
                            <option selected disabled hidden>Type</option>
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
                        <input 
                            id="min-score" 
                            name="min-score"
                            placeholder="Min score (0.0-10.0)" 
                            type="number" 
                            min="0"
                            max="10"
                            onInput={(e) => {
                                if (e.target.value > 10) e.target.value = 10;
                                if (e.target.value < 0) e.target.value = 0;
                            }}
                            onChange={handleFilterChange}
                        />
                        <input 
                            id="max-score"
                            name="max_score"
                            placeholder="Max score (0.0-10.0)" 
                            type="number"
                            min="0"
                            max="10"
                            onInput={(e) => {
                                if (e.target.value > 10) e.target.value = 10;
                                if (e.target.value < 0) e.target.value = 0;
                            }}
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    <div className="filter-group">
                        <select name="status" onChange={handleFilterChange}>
                            <option selected disabled hidden>Status</option>
                            <option value="airing">Airing</option>
                            <option value="complete">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>  
                    </div>
                    
                    <div className="filter-group">
                        <select name="rating" onChange={handleFilterChange}>
                            <option selected disabled hidden>Ratings</option>
                            <option value="g">G - All ages</option>
                            <option value="pg">PG - Children</option>
                            <option value="pg13">PG-13 - Teens 13+</option>
                            <option value="r17">R - Violence & profanity</option>
                            <option value="r">R+ - Mild Nudity</option>
                            <option value="rx">Rx - Hentai</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sfw">
                            <input 
                                id="sfw"
                                name="sfw" 
                                type="checkbox" 
                                onChange={handleFilterChange}/>
                        </label>
                    </div>

                    <div className="filter-group">
                        <button type="submit" className="apply-filters-button">
                            Filter
                        </button>
                        <button type="reset" className="clear-filters-button">
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FilterBar;