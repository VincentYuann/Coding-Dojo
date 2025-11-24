const BASE_URL = 'https://api.jikan.moe/v4';

export const searchAnimes = async (query, page=1) => {
    const response = await fetch(`${BASE_URL}/anime?q=${query}&limit=25&page=${page}`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data; 
};

export const getTopAnimes = async () => {
    // Max is 25 animes per page from the Jikan API
    const response = await fetch(`${BASE_URL}/top/anime?limit=10&`);
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};

export const getRandomAnimes = async (count=10) => {
    const animes = [];

    for (let i=0; i < count; i++) {
        const response = await fetch(`${BASE_URL}/random/anime`);
        if (response.ok) {
            const data = await response.json();
            animes.push(data.data);
            console.log("Fetched random anime:", data.data.title);
        }
    }
    return animes;
};
