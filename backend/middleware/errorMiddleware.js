// backend/middleware/errorMiddleware.js
const config = require('../config/config');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  console.error("Global Error Handler Caught:", err); // Log the error for server-side inspection

  res.json({
    message: err.message,
    // Optionally, include stack trace in development mode
    stack: config.nodeEnv === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
