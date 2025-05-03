import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/appError';

/**
 * Handles Mongoose CastError (Invalid ObjectId, etc.)
 */
const handleCastErrorDB = (err: mongoose.Error.CastError): AppError => {
  const error = new AppError(
    `Invalid value: '${err.value}' for field '${err.path}'`,
    400,
  );
  error.type = 'CAST_ERROR';
  return error;
};

/**
 * Handles Mongoose Validation Errors
 */
const handleValidationErrorDB = (
  err: mongoose.Error.ValidationError,
): AppError => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const error = new AppError(`Validation error: ${errors.join('. ')}`, 400);
  error.type = 'VALIDATION_ERROR';

  // Add validation fields for more detailed frontend handling
  error.validationErrors = Object.keys(err.errors).reduce(
    (acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    },
    {} as Record<string, string>,
  );

  return error;
};

/**
 * Handles Duplicate Field Errors (MongoDB)
 */
const handleDuplicateFieldsDB = (err: any): AppError => {
  let field = '';
  let value = '';

  // Extract field and value from different error formats
  if (err.keyValue) {
    field = Object.keys(err.keyValue)[0];
    value = err.keyValue[field];
  } else {
    // Handle the E11000 error format in message
    const match = err.message.match(
      /index:\s+(\w+)_\d+\s+dup\s+key:\s+{\s+(\w+):\s+"(.+?)"\s+}/,
    );
    if (match) {
      field = match[2];
      value = match[3];
    }
  }

  const error = new AppError(
    `This ${field} '${value}' already exists. Please use a different value.`,
    400,
  );
  error.type = 'DUPLICATE_FIELD';
  error.field = field;
  return error;
};

/**
 * Handles JWT Errors (Invalid or Expired)
 */
const handleJWTError = (): AppError => {
  const error = new AppError('Invalid token. Please log in again.', 401);
  error.type = 'INVALID_TOKEN';
  return error;
};

const handleJWTExpiredError = (): AppError => {
  const error = new AppError('Token expired. Please log in again.', 401);
  error.type = 'EXPIRED_TOKEN';
  return error;
};

/**
 * Formats and sends error response
 */
const sendErrorResponse = (err: AppError, req: Request, res: Response) => {
  if (res.headersSent) return;

  const response = {
    status: err.status,
    statusCode: err.statusCode,
    type: err.type || 'UNKNOWN_ERROR',
    message: err.message,

    // Add validation errors if they exist
    ...(err.validationErrors && { validationErrors: err.validationErrors }),

    // Add additional details for specific error types
    ...(err.field && { field: err.field }),

    // Include debugging information in development
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err,
    }),
  };

  return res.status(err.statusCode).json(response);
};

/**
 * Global Error Handling Middleware
 */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error = err;

  // Default status
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // Clone error to avoid modifying the original
  if (!(error instanceof AppError)) {
    error = new AppError(
      error.message || 'Something went wrong',
      error.statusCode || 500,
    );
    error.type =
      error.type || (err.name ? `${err.name.toUpperCase()}` : 'SERVER_ERROR');
  }

  // Handle specific error types
  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationErrorDB(err);
  // Check for duplicate key error using both code and message content
  if (
    (err as any).code === 11000 ||
    err.message?.includes('E11000 duplicate key error')
  )
    error = handleDuplicateFieldsDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Log only significant errors in development mode
  if (process.env.NODE_ENV === 'development' && !error.isOperational) {
    console.error('[ERROR]', err);
  }

  // Send the formatted error response
  sendErrorResponse(error, req, res);
};

export default globalErrorHandler;
