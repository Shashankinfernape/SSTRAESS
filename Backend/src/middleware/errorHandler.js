// backend/src/middleware/errorHandler.js
import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const isProduction = process.env.NODE_ENV === 'production';
  const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

  let message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    res.status(404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    res.status(400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    res.status(400);
  }

  // Log the error
  logger.error(err.message, err);

  // Send response
  res.json({
    message: message,
    // Show stack trace only in development or debug mode
    stack: (isProduction && !DEBUG_MODE) ? null : err.stack,
  });
};

export default errorHandler;