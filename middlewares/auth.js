const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token || authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "No token provided" });
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // chứa uid, email,... của user
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
