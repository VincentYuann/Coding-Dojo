import jikanService from '../services/jikanService.js';
import express from 'express';
const animeRouter = express.Router();

animeRouter.get('/search', async (req, res) => {
    try {
        const searchQueryObject = req.query;
        const data = await jikanService.searchAnimes(searchQueryObject);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/top', async (req, res) => {
    try {
        const limit = req.query.limit;
        const data = await jikanService.getTopAnimes(limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/random', async (req, res) => {
    try {
        const limit = req.query.limit;
        const data = await jikanService.getRandomAnimes(limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
    try {
        const data = await jikanService.getCurrentSeason();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/seasons/upcoming', async (req, res) => {
    try {
        const data = await jikanService.getUpcomingSeasons();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/seasons/:year/:season', async (req, res) => {
    const { year, season } = req.params;
    try {
        const data = await jikanService.getSeason(year, season);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/:animeId', async (req, res) => {
    res.json({ message: 'Anime Route' })
})

export default animeRouter;