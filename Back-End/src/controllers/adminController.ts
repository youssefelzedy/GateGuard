import { Admin } from '../models/adminModel';
import { User } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { IAdmin } from '../interfaces/intAdmin';
import { IUser } from '../interfaces/intUser';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/appError';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getUploadPath, verifyFileExists } from '../utils/fileUpload';
import { getUploadConfig } from '../config/uploadConfig';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const uploadConfig = getUploadConfig();
      const uploadPath = uploadConfig.adminsPath;

      console.log('Multer destination callback:', {
        uploadPath,
        exists: fs.existsSync(uploadPath),
        env: process.env.NODE_ENV,
        uploadConfig,
      });

      // Double-check directory exists and is writable
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Test write permissions
      const testFile = path.join(uploadPath, '.test-write');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);

      cb(null, uploadPath);
    } catch (error) {
      console.error('Error in multer destination callback:', error);
      cb(error as any, '');
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      const filename = `admin-${req.user!._id}-${uniqueSuffix}${ext}`;
      console.log('Multer filename callback:', {
        originalname: file.originalname,
        generatedFilename: filename,
        userId: req.user!._id,
      });
      cb(null, filename);
    } catch (error) {
      console.error('Error in multer filename callback:', error);
      cb(error as any, '');
    }
  },
});

// File filter to only allow images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400) as any);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});

const adminController = {
  getAllAdmins: expressAsyncHandler(async (req: Request, res: Response) => {
    // get all admins expect the owner of the garage itself
    const currentAdminId = req.user!._id;

    let filter: any = {};
    if (req.params.garageId) filter.garage = req.params.garageId;
    filter.role = { $ne: 'Owner' };
    const admins: IAdmin[] = await Admin.find(filter).populate({
      path: 'garage',
      select: 'garageName',
    });
    res.status(200).json({
      status: 'success',
      results: admins.length,
      data: {
        admins,
      },
    });
  }),

  getAdmin: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const admin: IAdmin | null = await Admin.findById(req.params.id);
      if (!admin) return next(new AppError('Admin not found', 404));

      res.status(200).json({
        status: 'success',
        data: {
          admin,
        },
      });
    },
  ),

  getMe: (req: Request, res: Response, next: NextFunction) => {
    console.log('req.user:', req.user);
    req.params.id = req.user!.id;
    next();
  },

  // Middleware for file upload
  uploadAdminPhoto: upload.single('image'),

  // Controller to handle image upload
  uploadImage: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return next(new AppError('No image file uploaded', 400));
      }

      // Log file information for debugging
      console.log('File upload info:', {
        filename: req.file.filename,
        destination: req.file.destination,
        path: req.file.path,
        size: req.file.size,
        environment: process.env.NODE_ENV,
        cwd: process.cwd(),
        dirname: __dirname,
      });

      // Check if destination directory exists
      const destinationExists = fs.existsSync(req.file.destination);
      console.log('Destination directory check:', {
        destination: req.file.destination,
        exists: destinationExists,
        stats: destinationExists ? fs.statSync(req.file.destination) : 'N/A',
      });

      // Verify the file actually exists
      const fileExists = verifyFileExists(req.file.path);
      console.log('File existence check:', {
        filePath: req.file.path,
        exists: fileExists,
        stats: fileExists ? fs.statSync(req.file.path) : 'N/A',
      });

      if (!fileExists) {
        return next(
          new AppError('File upload failed - file not saved to disk', 500),
        );
      }

      // Update admin with new image path
      const updatedAdmin = await Admin.findByIdAndUpdate(
        req.user!._id,
        { image: req.file.filename },
        { new: true, runValidators: true },
      );

      if (!updatedAdmin) {
        return next(new AppError('Could not update admin profile', 404));
      }

      res.status(200).json({
        status: 'success',
        message: 'Image uploaded successfully',
        data: {
          user: {
            user: updatedAdmin.name,
            image: req.file.filename,
          },
        },
      });
    },
  ),

  editAdmin: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const admin: IAdmin | null = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!admin) return next(new AppError('Admin not found', 404) as any);
      if (
        req.body.email ||
        req.body.role ||
        req.body.garage ||
        req.body.password
      ) {
        {
          return next(
            new AppError(
              'You can only edit your phoneNumber, national security and name',
              400,
            ) as any,
          );
        }
      }
      res.status(200).json({
        status: 'success',
        data: {
          admin,
        },
      });
    },
  ),

  // Debug endpoint to check file paths in production
  debugPaths: expressAsyncHandler(async (req: Request, res: Response) => {
    const uploadPath = getUploadPath('images/admins');
    const uploadConfig = getUploadConfig();

    res.status(200).json({
      status: 'success',
      data: {
        environment: process.env.NODE_ENV,
        cwd: process.cwd(),
        dirname: __dirname,
        oldUploadPath: uploadPath,
        oldUploadPathExists: fs.existsSync(uploadPath),
        newUploadConfig: uploadConfig,
        newAdminsPathExists: fs.existsSync(uploadConfig.adminsPath),
        publicPath: getUploadPath(),
        publicPathExists: fs.existsSync(getUploadPath()),
        directoryContents: fs.existsSync(uploadConfig.adminsPath)
          ? fs.readdirSync(uploadConfig.adminsPath)
          : 'Directory does not exist',
      },
    });
  }),

  // Serve individual admin images
  getAdminImage: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { filename } = req.params;

      if (!filename) {
        return next(new AppError('Image filename is required', 400));
      }

      const uploadConfig = getUploadConfig();
      const imagePath = path.join(uploadConfig.adminsPath, filename);

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        return next(new AppError('Image not found', 404));
      }

      // Verify it's actually an image file
      const ext = path.extname(filename).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

      if (!allowedExtensions.includes(ext)) {
        return next(new AppError('Invalid image format', 400));
      }

      // Set appropriate content type
      const contentTypes: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      };

      const contentType = contentTypes[ext] || 'image/jpeg';

      // Set cache headers for better performance
      res.set({
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        ETag: `"${filename}-${fs.statSync(imagePath).mtime.getTime()}"`,
      });

      // Send the file
      res.sendFile(imagePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          return next(new AppError('Error serving image', 500));
        }
      });
    },
  ),

  deleteAdmin: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const admin: IAdmin | null = await Admin.findByIdAndDelete(req.params.id);
      if (admin?.id == req.user?._id) {
        return next(new AppError('You cannot delete yourself', 400) as any);
      }
      if (!admin) return next(new AppError('Admin not found', 404) as any);

      res.status(204).json({
        status: 'success',
        message: 'Admin deleted successfully',
      });
    },
  ),

  deleteUser: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: IUser | null = await User.findByIdAndDelete(req.params.id);
      if (!user) return next(new AppError('User not found', 404) as any);

      res.status(204).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    },
  ),
};
export default adminController;
