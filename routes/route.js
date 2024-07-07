const express = require("express");
const {login, register} = require("../controllers/usersController");
const authenticateUser = require("../middleware/authenticateUser");
const { addMovie, deleteMovie, getMovieGenres, updateMovie } = require("../controllers/moviesController");
const getMovieImages = require("../controllers/tmdbController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    domain: process.env.FRONT_END_URL,
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out" });
});
router.get("/get-genres", getMovieGenres);
router.post("/add-movie", authenticateUser, addMovie);
router.delete("/delete-movie",authenticateUser, deleteMovie);
router.put("/update-movie",authenticateUser, updateMovie);
router.post("/get-movie-posters", getMovieImages);
module.exports = router;