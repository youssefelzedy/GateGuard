import path from 'path';
import fs from 'fs';

/**
 * Get the correct upload path for different environments
 * This ensures consistent file upload behavior in both development and production
 */
export const getUploadPath = (subPath: string = ''): string => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Use process.cwd() to get the actual working directory
  // This is more reliable than __dirname which changes based on build location
  const projectRoot = process.cwd();
  const basePublicPath = path.join(projectRoot, 'public');

  const fullPath = subPath
    ? path.join(basePublicPath, subPath)
    : basePublicPath;

  // Log for debugging
  console.log('Upload path calculation:', {
    isProduction,
    projectRoot,
    __dirname,
    basePublicPath,
    fullPath,
    subPath,
    exists_before_create: fs.existsSync(fullPath),
  });

  // Ensure the directory exists
  if (!fs.existsSync(fullPath)) {
    console.log('Creating directory:', fullPath);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log('Directory created successfully');

      // Verify it was created
      if (fs.existsSync(fullPath)) {
        console.log('Directory verification passed');
      } else {
        console.error('Directory creation verification failed');
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
  } else {
    console.log('Directory already exists');
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
