import { getTopAnimes } from "../../services/jikanAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import AnimeCard from "../AnimeCard";

function TopAnimeSection() {
    const { data: topAnimes } = useSuspenseQuery({
        queryKey: ["topAnimes"],
        queryFn: () => getTopAnimes(14),
    });

    return (
        <>
            {topAnimes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </>
    );
}

export default TopAnimeSection;
