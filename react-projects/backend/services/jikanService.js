import axios from 'axios';

const jikanAPI = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
})

const jikanService = {
    // Max 25 results per page
    searchAnimes: async (filterObject={}) => {
        console.log('Filter Object:', filterObject);
        try {
            const res = await jikanAPI.get('/anime', {
                params:  { ...filterObject }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            }
        } 
        catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },
    getTopAnimes: async (limit=10) => {
        try {
            const res = await jikanAPI.get('/top/anime', {
                params: { limit: limit }
            });
            
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },
    getRandomAnimes: async () => {
        try {
            const res = await jikanAPI.get(`/random/anime`);
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    },
    getAnimeGenres: async () => {
        try {
            const res = await jikanAPI.get(`/genres/anime`);
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
    }
};

export default jikanService;
