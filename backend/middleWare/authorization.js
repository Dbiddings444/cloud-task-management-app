const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function authMiddleware(req, res) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      try {
        const user = jwt.verify(token, JWT_SECRET);
        res.status(200).json(user);
      } catch (err) {
        console.log("JWT verification error: ", err);
        res.status(401).json({ error: "Invalid token" });
      }
    } else {
      res.status(400).json({ error: "No token provided" });
    }
  }
