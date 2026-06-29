/**
 * Global Error Handling Middleware
 * 
 * In a professional Express application, instead of letting routes fail with standard
 * HTML stack traces (which exposes server internals and breaks API contracts), we catch
 * all errors using this middleware.
 * 
 * Express detects that this is an error-handling middleware because it takes exactly
 * four arguments: (err, req, res, next).
 */
const errorHandler = (err, req, res, next) => {
  // Log the stack trace to the console for developers to debug
  console.error("Error caught in middleware:", err.stack);

  // Set the HTTP response code (default to 500 if not specified on the error object)
  const statusCode = err.statusCode || 500;

  // Respond with a structured JSON error payload
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "An unexpected server error occurred.",
      statusCode: statusCode,
      // Stack traces are useful for development, but in production, you should omit them
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    }
  });
};

module.exports = errorHandler;
