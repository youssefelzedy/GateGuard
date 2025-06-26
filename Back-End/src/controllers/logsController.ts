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
import path from 'path';

const logsController = {
  getAllLogs: expressAsyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.garageId) filter = { garage: req.params.garageId };

    const logs: ILog[] = await Logs.find(filter)
      .populate({
        path: 'user',
        select: 'phoneNumber name',
      })
      .populate({
        path: 'garage',
        select: 'name location',
      })
      .sort({ accessTime: -1 }); // Sort by most recent first

    res.status(200).json({
      status: 'success',
      results: logs.length,
      data: {
        logs,
      },
    });
  }),

  getLog: expressAsyncHandler(async (req: Request, res: Response) => {
    const log: ILog | null = await Logs.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'phoneNumber name',
      })
      .populate({
        path: 'garage',
        select: 'name location',
      });

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

  // Hardware-specific endpoint to check for unprocessed logs
  checkLatestLogForHardware: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { garage_id } = req.query;

      if (!garage_id || typeof garage_id !== 'string') {
        res.status(400);
        throw new AppError(
          'garage_id query parameter is required and must be a string',
          400,
        );
      }

      // Validate garage_id format
      if (!mongoose.Types.ObjectId.isValid(garage_id)) {
        res.status(400);
        throw new AppError('Invalid garage_id format', 400);
      }

      // Find garage to ensure it exists
      const garage = await Garage.findById(garage_id);
      if (!garage) {
        res.status(404);
        throw new AppError('Garage not found', 404);
      }

      // Find the latest unprocessed log for this garage
      const latestUnprocessedLog = await Logs.findOne({
        garage: new mongoose.Types.ObjectId(garage_id),
        $or: [
          { processed: false },
          { processed: { $exists: false } }, // Handle existing logs without the processed field
        ],
      })
        .populate({
          path: 'user',
          select: 'phoneNumber name',
        })
        .sort({ accessTime: -1 }); // Most recent first

      if (!latestUnprocessedLog) {
        res.status(200).json({
          status: 'success',
          message: 'No unprocessed logs found',
          action: 'denied', // Default to denied when no unprocessed logs
          data: null,
        });
        return;
      }

      // Return the log status
      res.status(200).json({
        status: 'success',
        action: latestUnprocessedLog.action.toLowerCase(), // 'accepted' or 'denied'
        data: {
          logId: latestUnprocessedLog._id,
          accessTime: latestUnprocessedLog.accessTime,
          user: latestUnprocessedLog.user,
          plateId: latestUnprocessedLog.plateId,
        },
      });
    },
  ),

  // Hardware endpoint to mark a log as processed
  markLogAsProcessed: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { logId } = req.body;

      if (!logId || typeof logId !== 'string') {
        res.status(400);
        throw new AppError(
          'logId is required in request body and must be a string',
          400,
        );
      }

      // Validate logId format
      if (!mongoose.Types.ObjectId.isValid(logId)) {
        res.status(400);
        throw new AppError('Invalid logId format', 400);
      }

      // Update the log to mark it as processed
      const log = await Logs.findByIdAndUpdate(
        logId,
        { processed: true },
        { new: true },
      );

      if (!log) {
        res.status(404);
        throw new AppError('Log not found', 404);
      }

      res.status(200).json({
        status: 'success',
        message: 'Log marked as processed',
        data: {
          logId: log._id,
          processed: log.processed,
        },
      });
    },
  ),
};

// export const createLog = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { carPlate, location, screenshot } = req.body;
//       const result = await handleLogCreation({
//         carPlate,
//         location,
//         screenshot,
//       });
//       res.status(result.statusCode).json(result);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// const checkTheAcceptedPlate = async (
//   plateList: [string, number[], number[][]][],
//   garageId: string,
// ) => {
//   // Validate the garageId
//   if (!mongoose.Types.ObjectId.isValid(garageId)) {
//     throw new AppError('Invalid garage ID', 400);
//   }

//   // Check if the garage exists
//   const garage = await Garage.findById(garageId);
//   if (!garage) {
//     console.error(`Garage not found for ID: ${garageId}`);
//     throw new AppError('Garage not found', 404);
//   }

//   // Find users associated with this garage
//   const users = await User.find({ garage: garageId });

//   for (const plate of plateList) {
//     const detectedPlate = plate[0].trim();

//     for (const user of users) {
//       if (user.carPlate === plate[0]) {}
//         console.warn(`User ${user._id}  carPlate format`, user.carPlate);
//         console.log(typeof user.carPlate);
//         continue;
//       }

//       for (const userPlate of user.carPlate) {
//         const normalizedUserPlate = userPlate.trim();
//         console.log(`Comparing "${normalizedUserPlate}" with "${detectedPlate}"`);

//         if (normalizedUserPlate === detectedPlate) {
//           console.log('MATCH FOUND');
//           return user; // Early return on match
//         }
//       }
//     }

//     console.log('No match found for detected plate:', detectedPlate);
//   }

//   console.log('No matching user found for any plates in list.');
//   return null; // Or handle differently if needed
// };

export default logsController;
