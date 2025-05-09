const jwt = require("jsonwebtoken");

// User authentication middleware
function userAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

// Admin authentication middleware
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = { userAuth, adminAuth };
