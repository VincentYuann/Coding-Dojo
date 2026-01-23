import express from 'express';
const animeRouter = express.Router();

animeRouter.get('/top', (req, res) => {
    res.json({ message: 'Anime Route' })
})

animeRouter.get('/random', (req, res) => {
    res.json({ message: 'Anime Route' })
})

animeRouter.get('/:animeId', (req, res) => {
    res.json({ message: 'Anime Route' })
})

export default animeRouter;