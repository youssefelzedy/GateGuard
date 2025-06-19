import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { Admin } from '../models/adminModel';
import IAdmin from '../interfaces/intAdmin';
import { Garage } from '../models/garageModel';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/appError';

// import sendEmail from '../utils/email';

export const signToken = (id: string): string => {
  console.log('Signing JWT with secret:', process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn:
      parseInt(process.env.JWT_EXPIRES_IN as string, 10000) || '100000d',
  });
};

const createSendToken = (user: IAdmin, statusCode: number, res: Response) => {
  const token = signToken(user._id.toString());

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string, 10) *
          24 *
          60 *
          60 *
          1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  (user as any).password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const authController = {
  signupAndCreate: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        garageName,
        name,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        nationalSecurityNumber,
        location,
      } = req.body as {
        garageName: string;
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
        phoneNumber: string;
        nationalSecurityNumber: string;
        location: string;
      };

      if (
        !garageName ||
        !name ||
        !email ||
        !password ||
        !passwordConfirm ||
        !phoneNumber ||
        !nationalSecurityNumber ||
        !location
      ) {
        return next(new AppError('Please provide all required fields', 400));
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const garage = await Garage.create(
          [{ garageName, location, currentOccupancy: 0, active: true }],
          { session },
        );

        if (!garage || garage.length === 0) {
          throw new AppError('Error creating garage', 400);
        }

        const admin = await Admin.create(
          [
            {
              name,
              email,
              password,
              passwordConfirm,
              phoneNumber,
              nationalSecurityNumber,
              role: 'Owner',
              garage: garage[0]._id,
            },
          ],
          { session },
        );

        if (!admin || admin.length === 0) {
          throw new AppError('Error creating admin', 400);
        }

        await session.commitTransaction();
        session.endSession();

        createSendToken(admin[0], 201, res);
      } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        return next(
          error instanceof AppError
            ? error
            : new AppError(
                error.message || 'An error occurred during signup',
                500,
              ),
        );
      }
    },
  ),

  login: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
      }

      const admin = await Admin.findOne({ email }).select('+password');

      if (!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError('Incorrect email or password', 401));
      }

      createSendToken(admin, 200, res);
    },
  ),

  protect: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let token: string | undefined;
      if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return next(
          new AppError(
            'You are not logged in! Please log in to get access.',
            401,
          ),
        );
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        iat: number;
      };

      const currentUser = await Admin.findById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError(
            'The user belonging to this token does no longer exist.',
            401,
          ),
        );
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Please log in again.',
            401,
          ),
        );
      }

      req.user = currentUser;
      console.log('User:', req.user);
      next();
    },
  ),

  restrictTo: (...roles: string[]) =>
    expressAsyncHandler((req: Request, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return next(
          new AppError(
            'You do not have permission to perform this action',
            403,
          ),
        );
      }

      next();
    }),
};

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IAdmin;
    }
  }
}

export default authController;
