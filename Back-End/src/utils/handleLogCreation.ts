import { Request, Response, NextFunction } from 'express';
import { Logs } from '../models/logsModel';
import { User } from '../models/userModel';
import { Garage } from '../models/garageModel';
import AppError from './appError';

export const handleLogCreation = async ({
  carPlate,
  location,
  screenshot = null,
}: {
  carPlate: string;
  location: string;
  screenshot?: string | null;
}) => {
  if (!carPlate || !location) {
    throw new AppError('Car plate and location are required', 400);
  }

  const [user, garage] = await Promise.all([
    User.findOne({ carPlate }),
    Garage.findOne({ location }),
  ]);

  if (!user) {
    throw new AppError(`User with car plate ${carPlate} not found`, 404);
  }

  if (!garage) {
    throw new AppError(`Garage at location ${location} not found`, 404);
  }

  const hasAccess = user.garage.toString() === garage._id.toString();
  const action = hasAccess ? 'Accepted' : 'Denied';

  const log = await Logs.create({
    action,
    screenshot,
    accessTime: new Date(),
    user: user._id,
    garage: garage._id,
  });

  return {
    statusCode: hasAccess ? 201 : 403,
    status: hasAccess ? 'success' : 'fail',
    message: hasAccess
      ? 'Access granted'
      : 'User does not have access to this garage',
    data: { log },
  };
};
