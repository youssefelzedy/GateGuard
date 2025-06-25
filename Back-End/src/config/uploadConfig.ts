import path from 'path';
import fs from 'fs';

export interface UploadConfig {
  basePath: string;
  imagesPath: string;
  adminsPath: string;
}

/**
 * Get upload configuration based on environment
 * Uses environment variable UPLOAD_BASE_PATH if set, otherwise falls back to detection
 */
export const getUploadConfig = (): UploadConfig => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Allow override via environment variable
  let basePath: string;

  if (process.env.UPLOAD_BASE_PATH) {
    basePath = process.env.UPLOAD_BASE_PATH;
    console.log('Using UPLOAD_BASE_PATH from environment:', basePath);
  } else {
    // Fallback to automatic detection
    if (isProduction) {
      // In production, try different possible locations
      const possiblePaths = [
        process.cwd(), // Current working directory
        path.join(__dirname, '../..'), // From compiled dist/config to project root
        path.join(__dirname, '../../..'), // Alternative path
        '/app', // Common Docker container path
      ];

      // Find the first path that contains package.json (indicating project root)
      basePath =
        possiblePaths.find((p) => {
          const packageJsonPath = path.join(p, 'package.json');
          return fs.existsSync(packageJsonPath);
        }) || process.cwd();
    } else {
      // In development, use current working directory
      basePath = process.cwd();
    }
  }

  const publicPath = path.join(basePath, 'public');
  const imagesPath = path.join(publicPath, 'images');
  const adminsPath = path.join(imagesPath, 'admins');

  // Log the paths for debugging
  console.log('Upload configuration detection:', {
    isProduction,
    basePath,
    publicPath,
    imagesPath,
    adminsPath,
    __dirname,
    cwd: process.cwd(),
    envUploadPath: process.env.UPLOAD_BASE_PATH,
  });

  // Ensure all directories exist
  [publicPath, imagesPath, adminsPath].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      try {
        fs.mkdirSync(dir, { recursive: true });

        // Verify permissions
        fs.accessSync(dir, fs.constants.W_OK);
        console.log(
          `Directory created successfully with write permissions: ${dir}`,
        );
      } catch (error) {
        console.error(`Error creating directory ${dir}:`, error);
        throw error;
      }
    } else {
      // Check if we have write permissions
      try {
        fs.accessSync(dir, fs.constants.W_OK);
        console.log(`Directory exists with write permissions: ${dir}`);
      } catch (error) {
        console.error(
          `Directory exists but no write permissions: ${dir}`,
          error,
        );
        throw error;
      }
    }
  });

  return {
    basePath: publicPath,
    imagesPath,
    adminsPath,
  };
};

/**
 * Ensure upload directories exist and are writable
 */
export const ensureUploadDirectories = (): void => {
  getUploadConfig(); // This creates and verifies the directories as a side effect
};
