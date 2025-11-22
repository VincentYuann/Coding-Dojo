const BASE_URL = 'https://api.jikan.moe/v4';

export const getTopAnimes = async (page=1) => {
    // Max is 25 animes per page from the Jikan API
    const response = await fetch(`${BASE_URL}/top/anime?limit=25&page=${page}`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};

export const searchAnimes = async (query, page=1) => {
    const response = await fetch(`${BASE_URL}/anime?q=${query}&limit=25&page=${page}`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data; 
};

export const getRecentAnimeRecommendations = async () => {
    const response = await fetch(`${BASE_URL}/recommendations/anime`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
};

getTopAnimes();

