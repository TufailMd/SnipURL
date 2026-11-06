const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    error = new AppError("Invalid ID", 400);
  }

  // Duplicate MongoDB field
  if (err.code === 11000) {
    error = new AppError("Duplicate field value", 409);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);

    error = new AppError(messages.join(", "), 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
    error = new AppError("Invalid JSON", 400);
  }

  if (err.name === "ConflictError") {
    error = new AppError("Conflict found", 409);
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status: error.status || "error",
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default errorHandler;
