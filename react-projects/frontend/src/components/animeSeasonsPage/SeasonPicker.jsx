import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getSeasonList } from "../../services/animeService";

function SeasonPicker() {
    const [searchParams] = useSearchParams();
    const [seasonFilters, setseasonFilters] = useState({});
    const navigate = useNavigate();

    const { data: seasonList } = useSuspenseQuery({
        queryKey: ['seasons', 'list'],
        queryFn: getSeasonList,
        staleTime: Infinity,
    });

    const isFormValid = seasonFilters.year && seasonFilters.season;

    const handleQuickSeasonAcess = (type) => {
        setseasonFilters({});
        navigate(`/seasons/${type}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newParams = new URLSearchParams(searchParams);
        Object.entries(seasonFilters).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                newParams.set(key, value);
            }
        });

        navigate(`/seasons/specific?${newParams.toString()}`);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setseasonFilters({});
    };

    return (
        <div className="season-picker-container">
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="season-picker-form"
            >
                {/* Quick Access Group */}
                <div className="quick-access">
                    <button
                        name="current"
                        className={searchParams.get('type') === 'current' ? 'active' : ''}
                        type="button"
                        onClick={() => handleQuickSeasonAcess('current')}
                    >
                        Current
                    </button>
                    <button
                        name="upcoming"
                        className={searchParams.get('type') === 'upcoming' ? 'active' : ''}
                        type="button"
                        onClick={() => handleQuickSeasonAcess('upcoming')}
                    >
                        Upcoming
                    </button>
                </div>

                <span className="separator"></span>

                {/* Specific Search Group */}
                <div className="specific-search">
                    <select
                        name="year"
                        value={seasonFilters.year || ""}
                        onChange={e => setseasonFilters({ year: e.target.value, season: "" })}
                    >
                        <option value="" disabled hidden>Select Year</option>
                        {seasonList.map(item => (
                            <option key={item.year} value={item.year}>{item.year}</option>
                        ))}
                    </select>

                    <span>-</span>

                    <select
                        name="season"
                        value={seasonFilters.season || ""}
                        onChange={e => setseasonFilters({ ...seasonFilters, season: e.target.value })}
                        disabled={!seasonFilters.year}
                    >
                        <option value="" disabled hidden>
                            {seasonFilters.year ? "Pick a season" : "Pick a year first"}
                        </option>
                        {seasonFilters.year && seasonList
                            .find(item => item.year == seasonFilters.year)
                            .seasons.map(season => (
                                <option key={season} value={season}>{season}</option>))
                        }
                    </select>
                    <button type="submit" className="search" disabled={!isFormValid}>Search</button>
                    <button type="reset" className="reset">Reset</button>
                </div>
            </form >
        </div >
    );
}

export default SeasonPicker;
