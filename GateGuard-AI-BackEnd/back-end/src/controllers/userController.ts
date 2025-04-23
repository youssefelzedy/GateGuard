import { User } from '../models/userModel';
import IUser from '../interfaces/intUser';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import AppError from '../utils/appError';
import path from 'path';

const userController = {
  getAllUsers: expressAsyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.garageId) filter = { garage: req.params.garageId };
    const users: IUser[] = await User.find(filter).populate({
      path: 'garage',
      select: 'garageName',
    });
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }),
  getUser: expressAsyncHandler(async (req: Request, res: Response) => {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new AppError('user not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }),
};

export default userController;
