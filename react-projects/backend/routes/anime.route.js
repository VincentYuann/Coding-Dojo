import jikanService from '../services/jikanService.js';
import cacheAnimeService from "../services/cacheAnimeService.js";
import express from 'express';

const animeRouter = express.Router();

animeRouter.get('/search', async (req, res) => {
    let data;

    try {
        const searchQueryObject = req.query;
        data = await jikanService.searchAnimes(searchQueryObject);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data.animes)
})

animeRouter.get('/top', async (req, res) => {
    let data;

    try {
        const { limit } = req.query;
         data = await jikanService.getTopAnimes(limit);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data)
})

animeRouter.get('/random', async (req, res) => {
    let data;

    try {
        const { limit } = req.query;
        data = await jikanService.getRandomAnimes(limit);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data)
})

animeRouter.get('/genres', async (req, res) => {
    try {
        const data = await jikanService.getAnimeGenres();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// --------------------------------------------------New function to fetch anime seasons -------------------------------------------------
animeRouter.get('/seasons', async (req, res) => {
    try {
        const data = await jikanService.getSeasonList();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/seasons/current', async (req, res) => {
    let data;
    
    try {
        const { page } = req.query;
        data = await jikanService.getCurrentSeason(page);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data.animes);
})

animeRouter.get('/seasons/upcoming', async (req, res) => {
    let data;
    
    try {
        const { page } = req.query;
        data = await jikanService.getUpcomingSeasons(page);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data.animes);
})

animeRouter.get('/seasons/:year/:season', async (req, res) => {
    let data;
    
    try {
        const { year, season } = req.params;
        const { page } = req.query;

        data = await jikanService.getSeason(year, season, page);
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    cacheAnimeService.upsertAnimes(data.animes);
})

animeRouter.get('/:animeId', async (req, res) => {
    res.json({ message: 'Anime Route' })
})

export default animeRouter;