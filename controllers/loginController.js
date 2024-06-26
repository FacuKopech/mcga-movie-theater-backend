const db = require('../db/conn');
const bcrypt = require("bcrypt");
const env = require("dotenv");
const { createSecretToken } = require("../tokenGeneration/generateToken");
env.config();

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "Both email & password are required" });
  }
  const usersCollection = db.collection("user");
  const user = await usersCollection.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials. Try again." });
  }
  const token = createSecretToken(user._id, user.name, user.username, user.email);
  res.cookie("token", token, {
    domain: process.env.FRONT_END_URL,
    path: "/", 
    expires: new Date(Date.now() + 3600 * 1000),
    secure: true,
    httpOnly: false,
    sameSite: "None",
  });
  res.status(200).json({ token });
};
module.exports = loginController;