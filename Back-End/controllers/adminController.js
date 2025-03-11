const Admin = require('../models/Admin');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUsersIds = (req, res, next) => {
  // Nested Routes
  req.body.user = req.user.id; // forcing the user too add his id
  next();
};

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: {
      data: admins,
    },
  });
});

exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: admin,
    },
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.create(req.body);

  if (!admin) {
    return next(new AppError('Error creating admin', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: admin,
    },
  });
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
