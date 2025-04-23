import { Logs } from '../models/logsModel';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import AppError from '../utils/appError';
import ILog from '../interfaces/intLog';
import { get } from 'http';

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
};

export default logsController;
