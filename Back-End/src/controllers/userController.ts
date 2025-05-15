import { User } from '../models/userModel';
import IUser from '../interfaces/intUser';
import { Garage } from '../models/garageModel';
import IGarage from '../interfaces/intGarage';
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
    const user: IUser | null = await User.findById(req.params.id).populate({
      path: 'garage',
      select: 'garageName',
    });
    if (!user) {
      res.status(404);
      throw new AppError('user not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }),
  editUser: expressAsyncHandler(async (req: Request, res: Response) => {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new AppError('user not found', 404);
    }

    let adminGarageId: string = '';
    if (
      req.user &&
      'garage' in req.user &&
      typeof req.user.garage === 'object' &&
      'id' in req.user.garage
    ) {
      adminGarageId = (req.user.garage as { id: string }).id;
    } else if (req.user && typeof req.user.garage === 'string') {
      adminGarageId = req.user.garage;
    }

    const userGarageId = user.garage.toString();

    console.log('adminGarageId', adminGarageId);
    console.log('userGarageId', userGarageId);

    if (adminGarageId !== userGarageId) {
      res.status(403);
      throw new AppError('You are not authorized to edit this user', 403);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404);
      throw new AppError('user not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }),
};

export default userController;
