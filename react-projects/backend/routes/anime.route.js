import jikanService from '../services/jikanService.js'
import express from 'express';
const animeRouter = express.Router();

animeRouter.get('/search', async (req, res) => {
    try {
        const data = await jikanService.searchAnimes(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/top', async (req, res) => {
    try {
        const data = await jikanService.getTopAnimes(req.query.limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

animeRouter.get('/random', async (req, res) => {
    try {
        const data = await jikanService.getRandomAnimes();
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

animeRouter.get('/:animeId', async (req, res) => {
    res.json({ message: 'Anime Route' })
})

export default animeRouter;