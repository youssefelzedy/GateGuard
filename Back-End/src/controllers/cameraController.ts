import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

import Camera from '../models/cameraModel';
import { Garage } from '../models/garageModel';
import ICamera from '../interfaces/intCamera';
import AppError from '../utils/appError';

const cameraController = {
  // Create a new camera
  createCamera: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { cameraIP, cameraName } = req.body;

      if (!cameraIP) {
        return next(new AppError('Camera IP is required', 400));
      }

      // Get garage ID from logged in user
      const garageId = req.user!.garage;

      // Validate if garage exists
      const garage = await Garage.findById(garageId);
      if (!garage) {
        return next(new AppError('Garage not found', 404));
      }

      // Create new camera
      const camera = await Camera.create({
        cameraIP,
        cameraName,
        garage: garageId,
        cameraStatus: 'active',
      });

      res.status(201).json({
        status: 'success',
        data: {
          camera,
        },
      });
    },
  ),

  // Get all cameras for a specific garage
  getAllCameras: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filter = {};

      // Use garageId from params if provided, otherwise from authenticated user
      if (req.params.garageId) {
        filter = { garage: req.params.garageId };
      } else if (req.user) {
        filter = { garage: req.user.garage };
      }

      const cameras = await Camera.find(filter).populate({
        path: 'garage',
        select: 'garageName location',
      });

      res.status(200).json({
        status: 'success',
        results: cameras.length,
        data: {
          cameras,
        },
      });
    },
  ),

  // Get a specific camera
  getCamera: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const camera = await Camera.findById(req.params.id).populate({
        path: 'garage',
        select: 'garageName location',
      });

      if (!camera) {
        return next(new AppError('Camera not found', 404));
      }

      // Check if camera belongs to user's garage
      if (req.user && camera.garage.toString() !== req.user.garage.toString()) {
        return next(
          new AppError('You do not have permission to access this camera', 403),
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          camera,
        },
      });
    },
  ),

  // Update camera status
  updateCameraStatus: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { cameraStatus } = req.body;

      if (!cameraStatus || !['active', 'inactive'].includes(cameraStatus)) {
        return next(new AppError('Valid camera status is required', 400));
      }

      const camera = await Camera.findById(req.params.id);

      if (!camera) {
        return next(new AppError('Camera not found', 404));
      }

      // Check if camera belongs to user's garage
      if (req.user && camera.garage.toString() !== req.user.garage.toString()) {
        return next(
          new AppError('You do not have permission to update this camera', 403),
        );
      }

      camera.cameraStatus = cameraStatus;
      await camera.save();

      res.status(200).json({
        status: 'success',
        data: {
          camera,
        },
      });
    },
  ),
  deleteCamera: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const camera: ICamera | null = await Camera.findByIdAndDelete(
        req.params.id,
      );
      if (!camera) {
        return next(new AppError('Camera not found', 404));
      }
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  ),
};

export default cameraController;
