import { useSuspenseQuery } from "@tanstack/react-query";
import { getSeasonList } from "../../services/animeService";

function SeasonPicker() {
    const { seasonList } = useSuspenseQuery({
        queryKey: ['seasons', 'list'],
        queryFn: () => getSeasonList(),
        staleTime: Infinity,
    });

    const seasonListOptions = seasonList.map((options) => ({
        year: options.year,
        seasons: options.seasons
    }));

    return (
        <>

        </>
    );
}

export default SeasonPicker;
