import serverClient from '../services/serverClient';

// Max 25 results per page
export const searchAnimes = async (filterObject={}) => {
    try {
        const res = await serverClient.get('/anime/search', {
            params: {
                limit: 25,
                ...Object.fromEntries(filterObject)
            }
        });

        return {
            animes: res.data.animes,
            pagination: res.data.pagination
        }
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
};

export const getTopAnimes = async (limit=10) => {
    try {
        const res = await serverClient.get('/anime/top', {
            params: { limit: limit }
        });
        
        return res.data
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
};

export const getRandomAnimes = async (count=3) => {
    const randomAnimes = [];

    for (let i=0; i < count; i++) {
        try {
            const res = await serverClient.get('/anime/random');
            randomAnimes.push(res.data);
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    }

    return randomAnimes;
};

export const getAnimeGenres = async () => {
    try {
        const res = await serverClient.get(`/anime/genres`);
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
}
