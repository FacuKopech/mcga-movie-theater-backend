require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, name, username, email) => {
  return jwt.sign({ id, name, username, email }, process.env.TOKEN_KEY, {
    expiresIn: 3600,
  });
};