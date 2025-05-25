const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = verifyToken;
