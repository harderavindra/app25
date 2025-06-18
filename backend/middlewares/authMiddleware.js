import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken =  (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
    if (err) return res.sendStatus(403);
    try {
      const user = await User.findById(decoded.id).select("name email role"); // Fetch full user
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user; // Attach full user info to request
      next();
    } catch (dbErr) {
      console.error("Database error:", dbErr.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};
