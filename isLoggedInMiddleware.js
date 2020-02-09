// Name: Yeo Sheen Hern 
// Admin no. : 1902257
// Class: DIT/FT/1B/11

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }
    req.decodedToken = decodedToken;
    next();
  });
};