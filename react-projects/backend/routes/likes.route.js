import express from 'express';
const likesRouter = express.Router()

likesRouter.get('/', (req, res) => {
    res.json({ message: 'User Likes Route' })
})

likesRouter.route('/:animeId')
    .post((req, res) => {
        res.json({ message: 'Add to user likes' })
    })
    .delete((req, res) => {
        res.json({ message: 'Update if user liked anime' })
    })

export default likesRouter;