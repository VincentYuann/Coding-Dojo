import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toUnderscore } from "../../../utils/toUnderscore";
import { getAnimeGenres } from "../../../services/animeService";
import SelectDropDownCheckbox from "../filterBar/SelectDropDownCheckbox"

const INITIAL_FILTER_STATE = {
    q: "",
    type: "",
    minScore: "",
    maxScore: "",
    status: "",
    rating: "",
    sfw: false, //Filter out Adult entries
    genres: [], //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    genresExclude: "", //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    orderBy: "",
    sort: "",
    letter: "",
    startDate: "",
    endDate: "",
};

const TYPE_OPTIONS = [
    { value: "tv", label: "TV" },
    { value: "movie", label: "Movie" },
    { value: "ova", label: "OVA" },
    { value: "ona", label: "ONA" },
    { value: "special", label: "Special" },
    { value: "music", label: "Music" },
];

const STATUS_OPTIONS = [
    { value: "airing", label: "Airing" },
    { value: "complete", label: "Completed" },
    { value: "upcoming", label: "Upcoming" },
];

const RATING_OPTIONS = [
    { value: "g", label: "G - All Ages" },
    { value: "pg", label: "PG - Children" },
    { value: "pg13", label: "PG-13 - Teens" },
    { value: "r17", label: "R - Violence" },
    { value: "r", label: "R+ - Mild Nudity" },
    { value: "rx", label: "Rx - Hentai" },
];

function FilterBar({ searchQuery }) {
    const [, setSearchParams] = useSearchParams();
    const [filterObject, setFilterObject] = useState(INITIAL_FILTER_STATE);

    const { data: genres } = useSuspenseQuery({
        queryKey: ["genres"],
        queryFn: getAnimeGenres,
        staleTime: Infinity,
    });
    const genreOptions = genres.map((genre) => ({
        value: genre.mal_id,
        label: genre.name
    }));

    // Sync the navBar search query with the filterBar search query
    useEffect(() => {
        setFilterObject((prev) => ({
            ...prev,
            q: searchQuery,
        }));

        handleFilterReset;
    }, [searchQuery]);

    const updateFilterObject = (e, multiSelect = false) => {
        const { name, value, type, checked } = e.target;

        setFilterObject((prev) => {
            let newValue;

            // Checkbox
            if (type === "checkbox") {
                // Multiselect genre checkbox
                if (multiSelect) {
                    const currentList = [...prev.genres]

                    if (checked) {
                        newValue = [...currentList, value]
                    } else {
                        newValue = currentList.filter(genreID => genreID !== value).map(genreID => genreID)
                    }
                }
                // sfw checkbox
                else if (name === "sfw") {
                    newValue = checked;
                }

                // Single select checkbox
                else {
                    newValue = checked ? value : ""
                }
            }
            // Text or integer
            else {
                newValue = value
            }

            return ({
                ...prev,
                [name]: newValue
            });
        });
    };

    // -----------------------------------------------------------------------------------------------------------
    // Creates a new URL using the filterobject, passing it to the searchResults page to fetch anime API data
    const handleFilterSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        Object.entries(filterObject).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                params.append(toUnderscore(key), value);
            }
        });

        setSearchParams(params);
    };

    const handleFilterReset = (e) => {
        e.preventDefault();
        setFilterObject({
            ...INITIAL_FILTER_STATE, q: filterObject.q
        });
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
                <div className="filters-grid">
                    <SelectDropDownCheckbox
                        label="Type"
                        name="type"
                        options={TYPE_OPTIONS}
                        selectedValue={filterObject.type}
                        onChange={updateFilterObject}
                    />

                    <SelectDropDownCheckbox
                        label="Genres"
                        name="genres"
                        options={genreOptions}
                        selectedValue={filterObject.genres}
                        onChange={e => updateFilterObject(e, true)}
                        multiselect={true}
                    />

                    <div className="filter-score">
                        <input
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
                                    setFilterObject((prev) => ({ ...prev, minScore: max }));
                                } else {
                                    updateFilterObject(e);
                                }
                            }}
                        />
                        <span>-</span>
                        <input
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
                                    setFilterObject((prev) => ({ ...prev, maxScore: min }));
                                } else {
                                    updateFilterObject(e);
                                }
                            }}
                        />
                    </div>

                    <SelectDropDownCheckbox
                        label="Rating"
                        name="rating"
                        options={RATING_OPTIONS}
                        selectedValue={filterObject.rating}
                        onChange={updateFilterObject}
                    />

                    <SelectDropDownCheckbox
                        label="Status"
                        name="status"
                        options={STATUS_OPTIONS}
                        selectedValue={filterObject.status}
                        onChange={updateFilterObject}
                    />

                    <div className="filter-sfw">
                        <label>
                            <input
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
