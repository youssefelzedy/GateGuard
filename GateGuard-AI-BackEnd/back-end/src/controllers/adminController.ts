import { Admin } from '../models/adminModel';
import { Request, Response, NextFunction } from 'express';
import { IAdmin } from '../interfaces/intAdmin';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/appError';

const adminController = {
  getAllAdmins: expressAsyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.garageId) filter = { garage: req.params.garageId };
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
};

export default adminController;
