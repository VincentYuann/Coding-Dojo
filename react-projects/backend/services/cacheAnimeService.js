import supabase from "../config/supabaseClient.js";

const cacheAnimeService = {
    upsertAnimes: async (animeList) => {
        const uniqueAnimes = Array.from(
            new Map(animeList.map(anime => [anime.mal_id, anime])).values()
        );
        
        const { data, error } = await supabase
            .from("cached_animes")
            .upsert(
                uniqueAnimes.map(anime => ({
                    anime_id: anime.mal_id,
                    anime_object: anime,
                })),
            );

        if (error) {
            console.error("Database Cache Error:", error.message);
            return { success: false, error };
        }

        console.log(data, error);
        return { success: true, data };
    }
}

export default cacheAnimeService;