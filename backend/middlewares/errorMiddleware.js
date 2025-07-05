/**
 * Custom error classes for specific error types
 */
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ValidationError extends AppError {
    constructor(errors) {
      super('Validation failed', 400);
      this.errors = errors;
    }
  }
  
  class NotFoundError extends AppError {
    constructor(resource) {
      super(`${resource || 'Resource'} not found`, 404);
    }
  }
  
  class ConflictError extends AppError {
    constructor(message) {
      super(message, 409);
    }
  }
  
  /**
   * Error handling middleware
   */
  const errorHandler = (err, req, res, next) => {
    // Default to 500 if no status code
    err.statusCode = err.statusCode || 500;
  
    // Response object
    const response = {
      success: false,
      message: err.message || 'Internal Server Error',
    };
  
    // Include errors array for validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        ...response,
        message: 'Validation failed',
        errors
      });
    }
  
    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
      if (err.errors) response.errors = err.errors;
    }
  
    // Mongoose duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      response.message = `${field} already exists`;
      err.statusCode = 400;
    }
  
    // Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
      response.message = `Invalid ${err.path}: ${err.value}`;
      err.statusCode = 400;
    }
  
    // Custom error classes
    if (err instanceof AppError) {
      if (err.errors) response.errors = err.errors;
    }
  
    // Log the error
    console.error(`[${new Date().toISOString()}] ${err.message}`);
    if (process.env.NODE_ENV === 'development') {
      console.error(err.stack);
    }
  
    // Send response
    res.status(err.statusCode).json(response);
  };
  
  /**
   * 404 Not Found handler
   */
  const notFoundHandler = (req, res, next) => {
    next(new NotFoundError());
  };
  
  /**
   * Async error wrapper (eliminates try-catch blocks)
   */
  const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  export {
    AppError,
    ValidationError,
    NotFoundError,
    ConflictError,
    errorHandler,
    notFoundHandler,
    catchAsync
  };
  