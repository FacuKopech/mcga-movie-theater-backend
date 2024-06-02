const express = require("express");
const login = require("../controllers/login");

const router = express.Router();

router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;