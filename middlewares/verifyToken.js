const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  jwt.verify(token, "greenurjabackendjwt", (err, decoded) => {
    if (err) {
      // Token invalid or expired
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};
