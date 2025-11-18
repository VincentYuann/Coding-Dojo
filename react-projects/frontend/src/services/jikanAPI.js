const BASE_URL = 'https://api.jikan.moe/v4';

export const getTopAnimes = async () => {
    const response = await fetch(`${BASE_URL}/top/anime?limit=10`);
    const data = await response.json();
    console.log(data.data);
    return data.data;
};

export const searchAnimes = async (query) => {
    const response = await fetch(`${BASE_URL}/anime?q=${query}&limit=25`);
    const data = await response.json();
    return data.data; 
};

getTopAnimes();

