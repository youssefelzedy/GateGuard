import { User } from '../models/userModel';
import IUser from '../interfaces/intUser';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import AppError from '../utils/appError';

const userController = {
  getAllUsers: expressAsyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.garageId) filter = { garage: req.params.garageId };
    const users: IUser[] = await User.find(filter);
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }),
};

export default userController;
