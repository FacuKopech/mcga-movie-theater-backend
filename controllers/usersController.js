const db = require('../db/conn');
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../tokenGeneration/generateToken");

const login = async (req, res) => {
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

const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!(name && username && email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const usersCollection = db.collection("user");
  const existingUser = await usersCollection.findOne({ email });
  
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    name,
    username,
    email,
    password: hashedPassword,
  };
  const result = await usersCollection.insertOne(newUser);

  if (!result.acknowledged) {
    res.status(500).json({ message: 'Failed to register user' });
  }

  res.status(200).json({ message: 'User registered successfully' });
};

module.exports = { login, register };