const db = require('../db/conn');
const express = require("express");
const router = express.Router();

router.get("/api/get-movies", async (req, res) => {
    try {
        const moviesCollection = db.collection("movies");
        const results = await moviesCollection.find({}).toArray();
        if (!results.length) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const movies = results.map(movie => ({
            ...movie,
            _id: movie._id.toString()
        }));
        console.log(movies)
        res.setHeader('Content-Type', 'application/json');        
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send({ message: `Internal Server Error: ${error}` });
    }   
});


module.exports = router;