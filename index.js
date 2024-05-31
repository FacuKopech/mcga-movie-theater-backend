const express = require("express");
const app = express();
const loadEnvironment = require("./loadEnvironment.js");
const posts = require('./routes/posts.js')

const port = process.env.PORT; 

app.listen(port, () => console.log(`Server listening at port ${port}`));
app.use(posts);

