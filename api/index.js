const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require('../routes/route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.FRONT_END_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", authRoute);

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

app.listen(port, () => console.log(`Server listening at port ${port}`));

module.exports = app;
