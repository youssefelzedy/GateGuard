import { Logs } from '../models/logsModel';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { handleLogCreation } from '../utils/handleLogCreation';
import ILog from '../interfaces/intLog';
import IUser from '../interfaces/intUser';
import IGarage from '../interfaces/intGarage';
import mongoose from 'mongoose';

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

export const checkTheAcceptedPlate = async (
  plateList: [string, number[], number[][]][],
  garageId: string,
) => {
  // Validate the garageId
  if (!mongoose.Types.ObjectId.isValid(garageId)) {
    throw new AppError('Invalid garage ID', 400);
  }

  // Check if the garage exists
  const garage = await Garage.findById(garageId);
  if (!garage) {
    console.error(`Garage not found for ID: ${garageId}`);
    throw new AppError('Garage not found', 404);
  }

  // Find users associated with this garage
  const users = await User.find({ garage: garageId });

  for (const plate of plateList) {
    const detectedPlate = plate[0].trim();

    for (const user of users) {
      if (user.carPlate === plate[0]) {}
        console.warn(`User ${user._id}  carPlate format`, user.carPlate);
        console.log(typeof user.carPlate);
        continue;
      }

      for (const userPlate of user.carPlate) {
        const normalizedUserPlate = userPlate.trim();
        console.log(`Comparing "${normalizedUserPlate}" with "${detectedPlate}"`);

        if (normalizedUserPlate === detectedPlate) {
          console.log('MATCH FOUND');
          return user; // Early return on match
        }
      }
    }

    console.log('No match found for detected plate:', detectedPlate);
  }

  console.log('No matching user found for any plates in list.');
  return null; // Or handle differently if needed
};

export default logsController;
