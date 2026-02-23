import serverClient from '../services/serverClient';

// Max 25 results per page
export const searchAnimes = async (filterObject={}) => {
    try {
        const res = await serverClient.get('/anime/search', {
            params: {
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

export const getTopAnimes = async (limit=14) => {
    try {
        const res = await serverClient.get('/anime/top', {
            params: { limit: limit }
        });
        
        return res.data
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
};

export const getRandomAnimes = async (limit=14) => {
    try {
        const res = await serverClient.get('/anime/random', {
            params: { limit: limit }
        });

        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
};

export const getAnimeGenres = async () => {
    try {
        const res = await serverClient.get(`/anime/genres`);
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
};


// --------------------------------------------------New function to fetch anime seasons -------------------------------------------------
export const getSeasonList = async () => {
    try {
        const res = await serverClient.get('/anime/seasons');
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
}

export const getCurrentSeason = async (page) => {
    try {
        const res = await serverClient.get('/anime/seasons/current', {
            params: { page: page }
        });
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
}

export const getUpcomingSeasons = async (page) => {
    try {
        const res = await serverClient.get('/anime/seasons/upcoming', {
            params: { page: page }
        });
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
}

export const getSeason = async (year, season, page) => {
    try {
        const res = await serverClient.get(`/anime/seasons/${year}/${season}`, {
            params: { page: page }
        });
        return res.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.response.status}`);
    }
}
