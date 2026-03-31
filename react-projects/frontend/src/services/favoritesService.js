
import supabase from "./supabaseClient";

const favoritesService = {
    get: async (userId) => {
        const { data, error } = await supabase
            .from("favorites")
            .select("anime_object")
            .eq("user_id", userId);

        if (error) {
            console.error("Database Error:", error.message);
            return { success: false, error };
        }

        return { success: true, data };
    },
    upsert: async (userId, anime) => {
        const { data, error } = await supabase
            .from("favorites")
            .upsert({
                user_id: userId,
                anime_object: anime,
            });

        if (error) {
            console.error("Database Error:", error.message);
            return { success: false, error };
        }

        return { success: true, data };
    },
    delete: async (userId, animeId) => {
        const { data, error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", userId)
            .eq("anime_object->>mal_id", String(animeId));
    }
}

export default favoritesService;