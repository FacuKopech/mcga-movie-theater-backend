const express = require("express");
const app = express();
const loadEnvironment = require("./loadEnvironment.js");
const authRoute = require('./routes/route.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", authRoute);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BACK_END_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});
app.listen(port, () => console.log(`Server listening at port ${port}`));
