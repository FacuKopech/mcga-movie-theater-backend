const db = require('../db/conn');
const env = require("dotenv");
env.config();

const addMovie = async (req, res) => {  
  const { titulo, descripcion, estrellas, duracion, genero } = req.body;
  
  if (!(titulo || descripcion || estrellas || duracion || genero)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  const moviesCollection = db.collection("movies");
  const newMovie = { titulo, descripcion, estrellas, duracion, genero };
  await moviesCollection.insertOne(newMovie);
  res.status(201).json({ message: "Movie added successfully" });
};

const deleteMovie = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }

  const moviesCollection = db.collection("movies");
  const result = await moviesCollection.deleteOne({ _id: new db.ObjectID(movieId) });
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({ message: "Movie deleted successfully" });
};

const getMovieGenres = async (req, res) => {
  const moviesCollection = db.collection("movies");

  try {
    const result = await moviesCollection.aggregate([
      {
        $group: {
          _id: "$genero",
          movies: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          movies: 1
        }
      }
    ]).toArray();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Movies not found" });
    }

    res.status(200).json({ genres: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { addMovie, deleteMovie, getMovieGenres };

