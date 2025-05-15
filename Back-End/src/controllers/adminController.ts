import { Admin } from '../models/adminModel';
import { Request, Response, NextFunction } from 'express';
import { IAdmin } from '../interfaces/intAdmin';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/appError';
import multer from 'multer';
import path from 'path';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/admins');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `admin-${req.user!._id}-${uniqueSuffix}${ext}`);
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
      const user: IAdmin | null = await Admin.findById(req.params.id);
      if (!user) return next(new AppError('Admin not found', 404));

      res.status(200).json({
        status: 'success',
        data: {
          user,
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
};

export default adminController;
