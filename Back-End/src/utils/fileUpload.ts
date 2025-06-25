import path from 'path';
import fs from 'fs';

/**
 * Get the correct upload path for different environments
 * This ensures consistent file upload behavior in both development and production
 */
export const getUploadPath = (subPath: string = ''): string => {
  const isProduction = process.env.NODE_ENV === 'production';

  // In production: dist/ -> project root -> public/
  // In development: src/ -> project root -> public/
  const basePublicPath = isProduction
    ? path.join(__dirname, '../../public')
    : path.join(__dirname, '../../public');

  const fullPath = subPath
    ? path.join(basePublicPath, subPath)
    : basePublicPath;

  // Ensure the directory exists
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return fullPath;
};

/**
 * Check if a file exists and log useful debug information
 */
export const verifyFileExists = (filePath: string): boolean => {
  const exists = fs.existsSync(filePath);

  if (!exists) {
    console.error('File verification failed:', {
      filePath,
      environment: process.env.NODE_ENV,
      cwd: process.cwd(),
      dirname: __dirname,
    });
  }

  return exists;
};

/**
 * Get the public directory path for serving static files
 */
export const getPublicPath = (): string => {
  return getUploadPath();
};
