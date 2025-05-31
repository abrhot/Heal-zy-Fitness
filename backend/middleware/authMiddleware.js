const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authMiddleware(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if not token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if token is in Bearer format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token is not in Bearer format' });
  }

  const token = parts[1];

  try {
    // Verify token
    // IMPORTANT: Replace 'yourSecretKey' with an actual secret key, preferably from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
