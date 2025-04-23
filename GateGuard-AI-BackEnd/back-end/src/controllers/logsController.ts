import { Logs } from '../models/logsModel';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import ILog from '../interfaces/intLog';
import IUser from '../interfaces/intUser';

import { User } from '../models/userModel';
import { Garage } from '../models/garageModel';

const logsController = {
  getAllLogs: expressAsyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.garageId) filter = { garage: req.params.garageId };
    const logs: ILog[] = await Logs.find(filter).populate({
      path: 'garage',
      select: 'garageName',
    });
    res.status(200).json({
      status: 'success',
      results: logs.length,
      data: {
        logs,
      },
    });
  }),
  getLog: expressAsyncHandler(async (req: Request, res: Response) => {
    const log: ILog | null = await Logs.findById(req.params.id);
    if (!log) {
      res.status(404);
      throw new AppError('Log not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        log,
      },
    });
  }),

  createLog: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { screenshot, carPlate, location } = req.body;

      if (!carPlate || !location) {
        return next(new AppError('Car plate and location are required', 400));
      }

      // Run queries in parallel for better performance
      const [user, garage] = await Promise.all([
        User.findOne({ carPlate }),
        Garage.findOne({ location }),
      ]);

      // Handle not found cases
      if (!user) {
        return next(
          new AppError(`User with car plate ${carPlate} not found`, 404),
        );
      }

      if (!garage) {
        return next(
          new AppError(`Garage at location ${location} not found`, 404),
        );
      }

      // Check access and create log
      const hasAccess = user.garage.toString() === garage._id.toString();
      const action = hasAccess ? 'Accepted' : 'Denied';

      const log = await Logs.create({
        action,
        screenshot,
        accessTime: new Date(),
        user: user._id,
        garage: garage._id,
      });

      // Return consistent response structure with appropriate status code
      res.status(hasAccess ? 201 : 403).json({
        status: hasAccess ? 'success' : 'fail',
        message: hasAccess
          ? 'Access granted'
          : 'User does not have access to this garage',
        data: { log },
      });
    },
  ),
};

export default logsController;
