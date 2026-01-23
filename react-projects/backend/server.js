import likesRouter from './routes/likesRoute.js';
import animeRouter from './routes/animeRoute.js';
import express from 'express';
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
            status: 'active',
            message: 'AnimY Backend API',
            version: '1.0.0',
            uptime: Math.floor(process.uptime()) + 's'
        });
})

app.use('/api/likes', likesRouter);
app.use('/api/anime', animeRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ AnimY Server Initialized on Port ${PORT}`);
})