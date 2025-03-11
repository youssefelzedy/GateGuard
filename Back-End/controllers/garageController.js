const Garage = require('../models/Garage');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllGarages = catchAsync(async (req, res, next) => {
  const garages = await Garage.find();
  res.status(200).json({
    status: 'success',
    results: garages.length,
    data: {
      data: garages,
    },
  });
});

exports.getGarage = catchAsync(async (req, res, next) => {
  const garage = await Garage.findById(req.params.id);

  if (!garage) {
    return next(new AppError('No garage found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: garage,
    },
  });
});

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

exports.deleteGarage = catchAsync(async (req, res, next) => {
  const garage = await Garage.findByIdAndUpdate(req.params.id, {
    active: false,
  });

  if (!garage) {
    return next(new AppError('No garage found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
