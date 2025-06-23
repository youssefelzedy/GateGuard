import { Garage } from '../models/garageModel';
import IGarage from '../interfaces/intGarage';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

const garageController = {
  getAllGarages: expressAsyncHandler(async (req: Request, res: Response) => {
    const garages: IGarage[] = await Garage.find();

    res.status(200).json({
      status: 'success',
      results: garages.length,
      data: {
        garages,
      },
    });
  }),

  getGarage: expressAsyncHandler(async (req: Request, res: Response) => {
    const garage: IGarage | null = await Garage.findById(req.params.id);

    if (!garage) {
      res.status(404);
      throw new Error('Garage not found');
    }

    res.status(200).json({
      status: 'success',
      data: {
        garage,
      },
    });
  }),

  editGarage: expressAsyncHandler(async (req: Request, res: Response) => {
    const garage: IGarage | null = await Garage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!garage) {
      res.status(404);
      throw new Error('Garage not found');
    }
    if (req.user!.garage.toString() !== garage._id.toString()) {
      res.status(403);
      throw new Error('You do not have permission to edit this garage');
    }
    res.status(200).json({
      status: 'success',
      data: {
        garage,
      },
    });
  }),

  deleteGarage: expressAsyncHandler(async (req: Request, res: Response) => {
    const garage: IGarage | null = await Garage.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
    );

    if (!garage) {
      res.status(404);
      throw new Error('Garage not found');
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

// exports.getGarage = catchAsync(async (req, res, next) => {
//   const garage = await Garage.findById(req.params.id);

//   if (!garage) {
//     return next(new AppError('No garage found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: garage,
//     },
//   });
// });

// exports.createGarage = catchAsync(async (req, res, next) => {
//   const garage = await Garage.create(req.body);

//   if (!garage) {
//     return next(new AppError('Error creating garage', 400));
//   }

//   res.status(201).json({
//     status: 'success',
//     data: {
//       data: garage,
//     },
//   });
// });

// exports.deleteGarage = catchAsync(async (req, res, next) => {
//   const garage = await Garage.findByIdAndUpdate(req.params.id, {
//     active: false,
//   });

//   if (!garage) {
//     return next(new AppError('No garage found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

export default garageController;
