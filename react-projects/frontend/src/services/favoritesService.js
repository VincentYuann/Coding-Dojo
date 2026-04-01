
import supabase from "./supabaseClient";

const favoritesService = {
    get: async (userId) => {
        const { data, error } = await supabase
            .from("favorites")
            .select(`cached_animes (anime_object)`)
            .eq("user_id", userId);
        
        if (error) {
            console.error(error.message);
            throw error;
        } 
        
        const animeObjects = data.map(animeObject => animeObject.cached_animes.anime_object)
        return animeObjects
    },
    upsert: async (userId, animeId) => {
        const { data, error } = await supabase
            .from("favorites")
            .upsert({
                user_id: userId,
                anime_id: animeId,
            })
            .select();
        
        if (error) {
            console.error(error.message);
            throw error;
        } 

        return data;
    },
    delete: async (userId, animeId) => {
        const { data, error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", userId)
            .eq("anime_id", animeId)
            .select();
        
        if (error) {
            console.error(error.message);
            throw error;
        } 

        return data;
    }
}

export default favoritesService;