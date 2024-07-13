const express = require("express");
const { login, register } = require("../controllers/usersController");
const authenticateUser = require("../middleware/authenticateUser");
const { addMovie, deleteMovie, getMovieGenres, updateMovie } = require("../controllers/moviesController");
const getMovieImages = require("../controllers/tmdbController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
    secure: true,
    httpOnly: false,
    sameSite: "None",
  });
  res.json({ message: "Logged out" });
});
router.get("/get-genres", getMovieGenres);
router.post("/add-movie", authenticateUser, addMovie);
router.delete("/delete-movie", authenticateUser, deleteMovie);
router.put("/update-movie", authenticateUser, updateMovie);
router.post("/get-movie-posters", getMovieImages);

module.exports = router;