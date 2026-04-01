import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import favoritesService from "../services/favoritesService";
import { toast } from "react-hot-toast";

const favoritesContext = createContext();

function favoritesProvider({ children }) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: () => favoritesService.get(user.id),
        enabled: !!user,
    });

    const { mutate: addFavorite } = useMutation({
        mutationFn: (animeId) => favoritesService.upsert(user.id, animeId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] }),
        onError: () => toast.error("Failed to add favorite"),
    });

    const { mutate: removeFavorite } = useMutation({
        mutationFn: (animeId) => favoritesService.delete(user.id, animeId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] }),
        onError: () => toast.error("Failed to remove favorite"),
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