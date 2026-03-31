import { useState, useContext, createContext, useEffect, useMutation } from "react";
import { useAuth } from "../context/AuthContext";
import supabase from "../services/supabaseClient";
import favoritesService from "../services/favoritesService";
import { toast } from "react-hot-toast";

const favoritesContext = createContext();

function favoritesProvider() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const { mutate: getFavorites } = useMutation({
        mutationFn: async () => {
            favoritesService.get(user.id);
        },
        onSucess: (data) => setFavorites(data),
        onError: (error) => {
            toast.error("Failed to get favorites: " + error.message);
        },
        enabled: !!user,
    });

    const { mutate: addFavorite } = useMutation({
        mutationFn: async (animeId) => {
            favoritesService.upsert(user.id, animeId);
        },
        onError: (error) => {
            toast.error("Failed to add favorite: " + error.message);
        },
        enabled: !!user,
    });

    const { mutate: removeFavorite } = useMutation({
        mutationFn: async (animeId) => {
            favoritesService.delete(user.id, animeId);
        },
        onError: (error) => {
            toast.error("Failed to remove favorite: " + error.message);
        },
        enabled: !!user,
    });

    return (
        <favoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </favoritesContext.Provider>
    );
}

export const useFavorites = () => {
    return useContext(favoritesContext);
}

export default favoritesProvider;