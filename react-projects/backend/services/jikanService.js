import axios from 'axios';

const jikanAPI = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
})

const jikanService = {
    searchAnimes: async ( filterObject = {} ) => {
        try {
            const res = await jikanAPI.get('/anime', {
                params:  { 
                    order_by: 'popularity',
                    sort: 'asc',
                    ...filterObject 
                }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },

    getTopAnimes: async ( limit = 14 ) => {
        try {
            const res = await jikanAPI.get('/top/anime', {
                params: { limit: limit }
            });
            
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },

    getRandomAnimes: async ( limit = 14 ) => {
        try {
            const RELEVANT_PAGE_LIMIT = 400; 
            const randomPage = Math.floor(Math.random() * RELEVANT_PAGE_LIMIT) + 1; 
            
            const res = await jikanAPI.get('/anime', {
                params: {
                    page: randomPage,
                    sfw: true, // Exclude NSFW content on the home page
                    order_by: 'popularity',
                    sort: 'asc'
                }
            });
            
            const allAnime = res.data.data;
            return allAnime.slice(0, limit);
            
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status}`);
        }
    },

    getAnimeGenres: async () => {
        try {
            const res = await jikanAPI.get(`/genres/anime`);
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },
    
    // --------------------------------New functions to fetch anime seasons ----------------------------------------
    getSeasonList: async () => {
        try {
            const res = await jikanAPI.get('/seasons')
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },
    
    getCurrentSeason: async () => {
        try {
            const res = await jikanAPI.get(`/seasons/now`);
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },

    getUpcomingSeasons: async () => {
        try {
            const res = await jikanAPI.get(`/seasons/upcoming`);
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },

    getSeason: async (year, season) => {
        try {
            const res = await jikanAPI.get(`/seasons/${year}/${season}`);
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    }
};

export default jikanService;
