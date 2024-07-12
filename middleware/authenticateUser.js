const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("authenticateUser middleware called");
  const token = req.cookies.token;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
