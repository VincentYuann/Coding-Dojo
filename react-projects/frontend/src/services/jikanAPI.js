const BASE_URL = 'https://api.jikan.moe/v4';

// Max 25 results per page
export const searchAnimes = async (filterObject = {}) => {
    const queryString = filterObject.toString();

    const response = await fetch(`${BASE_URL}/anime?&limit=25&${queryString}`);
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    
    const data = await response.json();
    return {
        animes: data.data,
        pagination: data.pagination
    }
};

export const getTopAnimes = async (count=10) => {
    const response = await fetch(`${BASE_URL}/top/anime?limit=${count}`);
    
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const data = await response.json();
    return data.data;
};

export const getRandomAnimes = async (count=3) => {
    const randomAnimes = [];

    for (let i=0; i < count; i++) {
        const response = await fetch(`${BASE_URL}/random/anime`);
        if (response.ok) {
            const data = await response.json();
            randomAnimes.push(data.data);
        } else throw new Error(`API request failed: ${response.status}`);
    }

    return randomAnimes;
};

export const getAnimeGenres = async () => {
    const response = await fetch(`${BASE_URL}/genres/anime`);
    
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    
    const data = await response.json();
    return data.data;
}
