const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

const auth = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      logger.warn('No token provided for authentication');
      return res.status(401).json({
        success: false,
        message: 'Please provide a token for authorization',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      logger.warn(`User not found for token: ${decoded.id}`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.status === 'suspended') {
      logger.warn(`Suspended user attempted to access: ${user._id}`);
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

// Middleware to check user role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`User ${req.user._id} with role ${req.user.role} attempted unauthorized access`);
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    }
    next();
  };
};

module.exports = { auth, authorize };

