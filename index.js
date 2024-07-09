const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require('./routes/route.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
app.use(cors({
  origin: process.env.FRONT_END_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", authRoute);

app.listen(port, () => console.log(`Server listening at port ${port}`));
