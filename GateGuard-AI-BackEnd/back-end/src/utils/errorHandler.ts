import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/appError'; // ✅ Fix: Default Import

/**
 * Handles Mongoose CastError (Invalid ObjectId, etc.)
 */
const handleCastErrorDB = (err: mongoose.Error.CastError): AppError => {
  return new AppError(
    `Invalid value: '${err.value}' for field '${err.path}'`,
    400,
  );
};

/**
 * Handles Duplicate Field Errors (MongoDB)
 */
const handleDuplicateFieldsDB = (err: any): AppError => {
  const field = Object.keys(err.keyValue)[0]; // Extract duplicated field name
  return new AppError(`Duplicate value for field '${field}'.`, 400);
};

/**
 * Handles JWT Errors (Invalid or Expired)
 */
const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Token expired. Please log in again.', 401);

/**
 * Sends Error Response in Production
 */
const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  if (res.headersSent) return; // Prevent duplicate responses

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
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
  // Explicitly return void
  let error =
    err instanceof AppError
      ? err
      : new AppError(err.message || 'An error occurred', err.statusCode || 500);

  // Default status
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // Handle specific Mongoose errors
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(
      (e) => (e as mongoose.Error.ValidatorError).message,
    );
    res.status(400).json({ status: 'fail', messages });
    return; //  Ensure function does not return a Response object
  }

  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if ((err as any).code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Log only significant errors in development mode
  if (process.env.NODE_ENV === 'development') {
    // Only log non-operational errors (programming errors)
    if (!err.isOperational) {
      console.error('[ERROR]', err);
    }
  }

  // Ensure `sendErrorProd` does not return anything
  sendErrorProd(error, req, res);
};

export default globalErrorHandler;
