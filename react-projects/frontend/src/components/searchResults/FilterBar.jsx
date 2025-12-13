import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toUnderScore } from "../../utils/toUnderScore";
import { getAnimeGenres } from "../../services/jikanAPI";
import { useSuspenseQuery } from "@tanstack/react-query";

const INITIAL_FILTER_STATE = {
    q: "",
    type: "",
    minScore: "",
    maxScore: "",
    status: "",
    rating: "",
    sfw: false, //Filter out Adult entries
    genres: "", //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    genresExclude: "", //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    orderBy: "",
    sort: "",
    letter: "",
    startDate: "",
    endDate: "",
};

function FilterBar({ searchQuery }) {
    const [, setSearchParams] = useSearchParams();
    const [filterObject, setFilterObject] = useState(INITIAL_FILTER_STATE);
    const { data: genres } = useSuspenseQuery({
        queryKey: ["genres"],
        queryFn: getAnimeGenres,
        staleTime: Infinity,
    });

    // Sync the navBar search query with the filterBar search query
    useEffect(() => {
        setFilterObject((prev) => ({
            ...prev,
            q: searchQuery,
        }));
    }, [searchQuery]);

    const updateFilterObject = (e) => {
        const { name, value, type, checked, options, multiple } = e.target;

        let newValue;

        if (type === "checkbox") {
            // Handles a checkbox
            newValue = checked;
        } else if (multiple) {
            // Handles multi-select filters
            newValue = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value)
                .join(",");
        } else {
            // Handles a single-select filter
            newValue = value;
        }

        setFilterObject((prev) => ({
            ...prev,
            [name]: newValue, // Use the determined newValue directly
        }));
        console.log(name, newValue);
    };

    // Creates a URL using the filterobject, passing it to the searchResults page to fetch anime API data
    const handleFilterSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        Object.entries(filterObject).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                params.append(toUnderScore(key), value);
            }
        });

        setSearchParams(params);
    };

    const handleFilterReset = (e) => {
        e.preventDefault();
        setFilterObject(INITIAL_FILTER_STATE);
    };

    return (
        <div className="filter-bar">
            <form
                onSubmit={handleFilterSubmit}
                onReset={handleFilterReset}
                className="search-form"
            >
                <div className="filter-search-input">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search for anime..."
                        value={filterObject.q}
                        onChange={updateFilterObject}
                    />
                </div>

                <h3>Filters:</h3>
                <div className="filters">
                    <div className="filter-group">
                        <select
                            name="type"
                            value={filterObject.type}
                            onChange={updateFilterObject}
                        >
                            <option value="" selected disabled hidden>
                                Type
                            </option>
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
                        <select
                            name="genres"
                            value={filterObject.genres}
                            onChange={updateFilterObject}
                            multiple
                        >
                            <option value="" selected disabled hidden>
                                Genres
                            </option>
                            {genres.map((genre) => (
                                <option key={genre.mal_id} value={genre.mal_id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <input
                            id="min-score"
                            name="minScore"
                            placeholder="Min score"
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={filterObject.minScore}
                            onChange={(e) => {
                                const min = parseFloat(e.target.value);
                                const max = parseFloat(filterObject.maxScore);

                                // Is 'val' a valid number? AND Is 'max' a valid number? AND is val > max?
                                if (Number.isFinite(min) && Number.isFinite(max) && min > max) {
                                    setFilterObject((prev) => ({ ...prev, minScore: max }));
                                } else {
                                    updateFilterObject(e);
                                }
                            }}
                        />
                        <input
                            id="max-score"
                            name="maxScore"
                            placeholder="Max score"
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={filterObject.maxScore}
                            onChange={(e) => {
                                const min = parseFloat(filterObject.minScore);
                                const max = parseFloat(e.target.value);

                                // Is 'val' a valid number? AND Is 'max' a valid number? AND is val < max?
                                if (Number.isFinite(min) && Number.isFinite(max) && max < min) {
                                    setFilterObject((prev) => ({ ...prev, maxScore: min }));
                                } else {
                                    updateFilterObject(e);
                                }
                            }}
                        />
                    </div>

                    <div className="filter-group">
                        <select
                            name="status"
                            value={filterObject.status}
                            onChange={updateFilterObject}
                        >
                            <option value="" selected disabled hidden>
                                Status
                            </option>
                            <option value="airing">Airing</option>
                            <option value="complete">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <select
                            name="rating"
                            value={filterObject.rating}
                            onChange={updateFilterObject}
                        >
                            <option value="" selected disabled hidden>
                                Ratings
                            </option>
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
                                checked={filterObject.sfw}
                                onChange={updateFilterObject}
                            />
                            No Adult Entries
                        </label>
                    </div>

                    <div className="filter-button-inputs">
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
