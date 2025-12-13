import { getRandomAnimes } from "../../services/jikanAPI";
import { useSuspenseQuery } from "@tanstack/react-query";
import AnimeCard from "../AnimeCard";

function RandomAnimeSection() {
    const { data: randomAnimes } = useSuspenseQuery({
        queryKey: ["randomAnimes"],
        queryFn: () => getRandomAnimes(14),
    });

    return (
        <>
            {randomAnimes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </>
    );
}

export default RandomAnimeSection;
