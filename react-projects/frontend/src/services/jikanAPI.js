const BASE_URL = 'https://api.jikan.moe/v4';

// Max 25 results per page
export const searchAnimes = async (filterUrl, page=1) => {
    const response = await fetch(`${BASE_URL}/anime?&limit=25${filterUrl}`);
    
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const data = await response.json();
    return data.data; 
};

// Max 10 top animes
export const getTopAnimes = async () => {
    const response = await fetch(`${BASE_URL}/top/anime?limit=10&`);
    
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
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
        } else throw new Error(`API request failed: ${response.status}`);
    }

    return animes;
};
