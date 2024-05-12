const express = require("express");
const app = express();
app.listen(5173,() => console.log("Server listening at port 5173"));

app.get("/", (req, res) => {
    res.send("Hello World");
});