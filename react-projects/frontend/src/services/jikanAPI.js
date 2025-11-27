const BASE_URL = 'https://api.jikan.moe/v4';

// Search animes with query and optional filters
// Max 25 results per page
export const searchAnimes = async (query, page=1, filters) => {
    // Create the object instance
    const params = new URLSearchParams();
    
    // Add fixed parameters
    params.append('q', query);
    params.append('limit', 25);
    params.append('page', page);

    // Loop through filters and append to params if value exists
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    // Generate the full URL with query parameters
    console.log(`${BASE_URL}/anime?${params.toString()}`);
    const response = await fetch(`${BASE_URL}/anime?${params.toString()}`);
    
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
