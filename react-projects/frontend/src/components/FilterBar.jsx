import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQueryUrl } from "../utils/createQueryUrl";

function FilterBar({ filters }) {
    const [filterObject, setFilterObject] = useState({
        q: filters.q || "",
        type: "",
        minScore: "",
        maxScore: "",
        status: "",
        rating: "",
        sfw: false, //Filter out Adult entries
        genres: [], //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        genresExclude: [], //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
        orderBy: "",
        sort: "",
        letter: "",
        startDate: "",
        endDate: "",
        page: 1
    });
    const navigate = useNavigate();

    // Sync local filter search query with global search query
    useEffect(() => {
        setFilterObject(prev => ({
            ...prev,
            q: filters.q || ""
        }));
    }, [filters]);
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const queryUrl = createQueryUrl(filterObject);
        navigate(queryUrl ? `/search?&${queryUrl}` : "/search");
    };

    const updateFilterObject = (e) => {
        const { name, value, type, checked } = e.target;

        setFilterObject(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(e.target.name, e.target.value)
    };
    
    return (
        <div className="filter-bar">
            <form onSubmit={handleFilterSubmit} className="search-form">
                <div className="filter-search-input">
                    <input 
                        type="text" 
                        name="q"
                        placeholder="Search anime..." 
                        value={filterObject.q}
                        onChange={updateFilterObject}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <h3>Filters:</h3>
                <div className="filters">
                    <div className="filter-group">
                        <select name="type" value={filterObject.type} onChange={updateFilterObject}>
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
                            name="minScore"
                            placeholder="Min score" 
                            type="number" 
                            min="1" max="10" step="0.1"
                            value={filterObject.minScore}
                            onChange={(e) => {
                                const min = parseFloat(e.target.value);
                                const max = parseFloat(filterObject.maxScore);

                                // Is 'val' a valid number? AND Is 'max' a valid number? AND is val > max?
                                if (Number.isFinite(min) && Number.isFinite(max) && min > max) {
                                    setFilterObject(prev => ({...prev, minScore: max}));
                                } else {
                                    updateFilterObject(e)
                                }
                            }}
                        />
                        <input 
                            id="max-score"
                            name="maxScore"
                            placeholder="Max score" 
                            type="number"
                            min="1" max="10" step="0.1"
                            value={filterObject.maxScore}
                            onChange={(e) => {
                                const min = parseFloat(filterObject.minScore);
                                const max = parseFloat(e.target.value);

                                // Is 'val' a valid number? AND Is 'max' a valid number? AND is val < max?
                                if (Number.isFinite(min) && Number.isFinite(max) && max < min) {
                                    setFilterObject(prev => ({...prev, maxScore: min}));
                                } else {
                                    updateFilterObject(e);
                                }
                            }}
                        />
                    </div>
                    
                    <div className="filter-group">
                        <select name="status" onChange={updateFilterObject}>
                            <option selected disabled hidden>Status</option>
                            <option value="airing">Airing</option>
                            <option value="complete">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>  
                    </div>
                    
                    <div className="filter-group">
                        <select name="rating" onChange={updateFilterObject}>
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
                        <label>
                            <input 
                                id="sfw"
                                name="sfw" 
                                type="checkbox" 
                                onChange={updateFilterObject}
                            />
                            No Adult Entries
                        </label>
                    </div>

                    <div className="filter-button-inputs">
                        <button type="submit" className="apply-filters-button">Filter</button>
                        <button type="reset" className="clear-filters-button">Clear</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FilterBar;