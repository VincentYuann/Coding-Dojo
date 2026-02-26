import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSeasonList } from "../../services/animeService";
import DropDownCheckbox from "../../components/DropDownCheckbox";

const INITIAL_FILTER_STATE = {
    year: "",
    season: "",
};

function SeasonPicker() {
    const [searchParams] = useSearchParams();
    const [seasonFilters, setseasonFilters] = useState({ ...INITIAL_FILTER_STATE, ...Object.fromEntries(searchParams.entries()) });
    const navigate = useNavigate();

    const { data: seasonList } = useSuspenseQuery({
        queryKey: ['seasons', 'list'],
        queryFn: getSeasonList,
        staleTime: Infinity,
    });

    const yearOptions = seasonList.map(item => ({
        value: item.year,
        label: item.year
    }));

    const selectedYear = seasonList.find(item => item.year == seasonFilters.year);

    const seasonOptions = selectedYear ? selectedYear
        .seasons.map(season => ({
            value: season,
            label: season.charAt(0).toUpperCase() + season.slice(1)
        }))
        : [];

    // -----------------------------------------------------------------------------------------------------------
    const handleQuickSeasonAcess = (type) => {
        setseasonFilters(INITIAL_FILTER_STATE);
        navigate(`/seasons/${type}`);
    };

    const handleSeasonSubmit = (e) => {
        e.preventDefault();

        const newParams = new URLSearchParams();
        Object.entries(seasonFilters).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                newParams.set(key, value);
            }
        });

        navigate(`/seasons/specific?${newParams.toString()}`);
    };

    const handleSeasonReset = (e) => {
        e.preventDefault();
        setseasonFilters(INITIAL_FILTER_STATE);
    };

    return (
        <div className="season-picker-container">
            <form
                onSubmit={handleSeasonSubmit}
                onReset={handleSeasonReset}
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
                    <DropDownCheckbox
                        filterParamKey="year"
                        options={yearOptions}
                        value={seasonFilters.year}
                        onChange={setseasonFilters}
                    />

                    <span>-</span>

                    <DropDownCheckbox
                        filterParamKey={seasonFilters.year ? "season" : "Pick a year first"}
                        options={seasonOptions}
                        value={seasonFilters.season}
                        onChange={setseasonFilters}
                        disabled={!seasonFilters.year}
                    />

                    <button type="submit" className="search" disabled={!(seasonFilters.year && seasonFilters.season)}>Search</button>
                    <button type="reset" className="reset">Reset</button>
                </div>
            </form >
        </div >
    );
}

export default SeasonPicker;
