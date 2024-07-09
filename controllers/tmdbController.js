const fetch = require('node-fetch');

const getMovieImages = async (req, res) => {
  const { movieTitles } = req.body;
  if (!movieTitles || !Array.isArray(movieTitles)) {
    return res.status(400).json({ message: "Parameter movieTitles is required" });
  }

  try {
    const moviesWithImages = {};
    const fetchImagePromises = movieTitles.map(async (movieTitle) => {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&api_key=${process.env.TMDB_API_KEY}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      if (searchData.results && searchData.results.length > 0) {
        const movieId = searchData.results[0].id;
        const imageUrl = `https://api.themoviedb.org/3/movie/${movieId}/images`;
        const imageResponse = await fetch(imageUrl, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
          }
        });
        const imageData = await imageResponse.json();
        if (imageData.posters && imageData.posters.length > 0) {
          moviesWithImages[movieTitle] = `https://image.tmdb.org/t/p/w500${imageData.posters[0].file_path}`;
        }
      }
    });

    await Promise.all(fetchImagePromises);

    res.status(200).json({ moviesWithImages });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = getMovieImages;
