/**
 * Authentication Middleware
 * 
 * Intercepts requests, validates JWT tokens in the Authorization header,
 * and sets the authenticated user context (req.user) for downstream routes.
 * Returns a 401 Unauthorized error if the token is invalid or missing.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Unauthorized: Authentication token is missing.');
      error.statusCode = 401;
      return next(error);
    }

    // Extract the JWT string
    const token = authHeader.split(' ')[1];

    // Verify token signature using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    // Retrieve user from the database. Omit the hashed password from the returned object.
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      const error = new Error('Unauthorized: User associated with this token does not exist.');
      error.statusCode = 401;
      return next(error);
    }

    // Bind user context to the request object for use in subsequent middleware or controllers
    req.user = user;
    next();
  } catch (error) {
    // Handle standard JWT verification errors
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      const err = new Error('Unauthorized: Token is invalid or expired.');
      err.statusCode = 401;
      return next(err);
    }
    next(error);
  }
};

module.exports = requireAuth;
