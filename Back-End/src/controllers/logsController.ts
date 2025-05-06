import { Logs } from '../models/logsModel';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { handleLogCreation } from '../utils/handleLogCreation';
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
      throw new AppError('Log not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        log,
      },
    });
  }),
};

export const createLog = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { carPlate, location, screenshot } = req.body;
      const result = await handleLogCreation({
        carPlate,
        location,
        screenshot,
      });
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default logsController;
