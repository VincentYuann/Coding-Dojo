import supabase from "./supabaseClient";

const favoritesService = {
    insert: async (userID, anime) => {
        const { data, error } = await supabase
            .from("favorites")
            .insert({
                user_id: userId,
                anime_object: anime,
            });

        if (error) {
            console.error("Database Error:", error.message);
            return { success: false, error };
        }

        return { success: true, data };
    },
    get: async () => {
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
    delete: async (animeId) => {
        const { data, error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", userId)
            .eq("anime_object->>mal_id", String(animeId));
    }
}

export default favoritesService;